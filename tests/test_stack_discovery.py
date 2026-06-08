from __future__ import annotations

import importlib.util
from pathlib import Path
from types import ModuleType
import unittest


REPO_ROOT = Path(__file__).resolve().parents[1]


def load_core_module(core_path: Path, module_name: str) -> ModuleType:
    """
    Business Logic（为什么需要这个函数）:
        回归测试需要分别验证源码 skill 与 CLI 打包 assets 中的 core.py，避免只修复其中一份导致发布产物继续缺失 stack。

    Code Logic（这个函数做什么）:
        接收 core.py 文件路径和临时模块名，使用 importlib 从指定路径加载模块并返回 ModuleType，供测试读取 AVAILABLE_STACKS 与 search_stack。
    """
    spec = importlib.util.spec_from_file_location(module_name, core_path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Cannot load module from {core_path}")

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class StackDiscoveryTest(unittest.TestCase):
    """
    Business Logic（为什么需要这个类）:
        用户安装 Codex skill 后需要能查询所有随包发布的技术栈指南，而不是只能查询 react-native。

    Code Logic（这个类做什么）:
        对 src 与 cli/assets 两套发布入口执行同一组断言，确保 AVAILABLE_STACKS 覆盖 data/stacks/*.csv，且 React stack 可被实际搜索。
    """

    def assert_stack_files_are_registered(self, package_root: Path, core_path: Path, module_name: str) -> None:
        """
        Business Logic（为什么需要这个函数）:
            每新增一个 stack CSV 都应该自动成为可查询 stack，避免维护者忘记同步手写配置。

        Code Logic（这个函数做什么）:
            从 data/stacks 读取 CSV 文件 stem 集合，加载对应 core.py，断言 AVAILABLE_STACKS 与 CSV stem 完全一致。
        """
        expected_stacks = {
            stack_file.stem
            for stack_file in (package_root / "data" / "stacks").glob("*.csv")
        }
        core_module = load_core_module(core_path, module_name)

        self.assertGreater(len(expected_stacks), 1)
        self.assertEqual(expected_stacks, set(core_module.AVAILABLE_STACKS))

    def test_cli_assets_register_all_packaged_stack_files(self) -> None:
        """
        Business Logic（为什么需要这个函数）:
            Codex 安装流程使用 CLI assets 生成 ~/.codex/skills/ui-ux-pro-max，因此 CLI assets 必须包含完整 stack 搜索能力。

        Code Logic（这个函数做什么）:
            验证 cli/assets/scripts/core.py 暴露的 AVAILABLE_STACKS 覆盖 cli/assets/data/stacks 下全部 CSV 文件。
        """
        package_root = REPO_ROOT / "cli" / "assets"
        self.assert_stack_files_are_registered(
            package_root,
            package_root / "scripts" / "core.py",
            "uipro_cli_assets_core",
        )

    def test_source_skill_registers_all_packaged_stack_files(self) -> None:
        """
        Business Logic（为什么需要这个函数）:
            源码 skill 目录同样可能被直接复制或打包发布，需要保持与 CLI assets 一致的 stack 覆盖。

        Code Logic（这个函数做什么）:
            验证 src/ui-ux-pro-max/scripts/core.py 暴露的 AVAILABLE_STACKS 覆盖 src/ui-ux-pro-max/data/stacks 下全部 CSV 文件。
        """
        package_root = REPO_ROOT / "src" / "ui-ux-pro-max"
        self.assert_stack_files_are_registered(
            package_root,
            package_root / "scripts" / "core.py",
            "uipro_source_core",
        )

    def test_cli_assets_can_search_react_stack(self) -> None:
        """
        Business Logic（为什么需要这个函数）:
            已安装的 Codex skill 需要支持 React 项目查询，不能在 argparse 或 stack config 阶段拒绝 react。

        Code Logic（这个函数做什么）:
            加载 CLI assets 的 core.py，调用 search_stack 查询 React 渲染建议，并断言结果来自 stacks/react.csv。
        """
        package_root = REPO_ROOT / "cli" / "assets"
        core_module = load_core_module(
            package_root / "scripts" / "core.py",
            "uipro_cli_assets_core_search",
        )

        result = core_module.search_stack("memo rerender bundle", "react")

        self.assertNotIn("error", result)
        self.assertEqual("stacks/react.csv", result["file"])
        self.assertGreater(result["count"], 0)


if __name__ == "__main__":
    unittest.main()
