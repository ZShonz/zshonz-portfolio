import ResponsiveImage from './ResponsiveImage';
export default function GlassCover({ project, active }) {
  return <div className="glass-content">
    <span className="glass-rail rail-top" aria-hidden="true" />
    <span className="glass-heading"><strong>{project.title}</strong></span>
    <div className="panel-picture glass-art"><ResponsiveImage src={project.cover || project.image} alt={`${project.title}品牌视觉`} draggable="false" sizes="(max-width: 640px) 61vw, 30vw" loading={active ? 'eager' : 'lazy'} fetchPriority={active ? 'high' : 'auto'} /></div>
    <span className="glass-english">{project.englishLines ? project.englishLines.map(line => <span className="glass-english-line" key={line}>{line}</span>) : project.englishTitle}</span>
    <span className="glass-category">{project.exhibitType}</span>
    <span className="glass-rail rail-bottom" aria-hidden="true" />
    <span className="glass-sheen" aria-hidden="true" />
    <span className="panel-view">查看案例 ↗</span>
  </div>;
}


