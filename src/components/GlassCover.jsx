export default function GlassCover({ project }) {
  return <div className="glass-content">
    <span className="glass-rail rail-top" aria-hidden="true" />
    <span className="glass-heading"><strong>{project.title}</strong></span>
    <div className="panel-picture glass-art"><img src={project.cover || project.image} alt={`${project.title}品牌视觉`} draggable="false" fetchPriority="high" /></div>
    <span className="glass-english">{project.englishLines ? project.englishLines.map(line => <span className="glass-english-line" key={line}>{line}</span>) : project.englishTitle}</span>
    <span className="glass-category">{project.exhibitType}</span>
    <span className="glass-rail rail-bottom" aria-hidden="true" />
    <span className="glass-sheen" aria-hidden="true" />
    <span className="panel-view">查看案例 ↗</span>
  </div>;
}


