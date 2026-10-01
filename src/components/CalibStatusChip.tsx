/**
 * 工作区顶部的校准状态标识。
 *
 * 只渲染「已提交到对齐链路」的校准信息快照（由 App 在应用校准 / 确认迁移预览时
 * 一并提交），不读取校准页里尚未确认的草稿（锚点勾选、筛选参数）。因此重新校准的
 * 预览计算中、计算失败或取消返回时，标识与锚点数都保持原样；只有迁移预览被确认
 * 提交后，才随新生效的 B 时间轴一起更新。
 */

export interface AppliedCalibInfo {
  /** 已提交校准实际启用的锚点数 */
  anchors: number;
}

export function CalibStatusChip({ applied }: { applied: AppliedCalibInfo | null }) {
  if (!applied) return <span className="calib-chip off">使用原始 B 时间</span>;
  return (
    <span className="calib-chip on" title={`${applied.anchors} 个锚点 · 分段线性映射`}>
      ✓ 时间轴已校准（{applied.anchors} 锚点）
    </span>
  );
}
