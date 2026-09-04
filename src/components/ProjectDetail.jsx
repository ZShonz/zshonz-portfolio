const sampleImages = [
  '01-positioning.jpg',
  '02-identity.jpg',
  '03-space-system.jpg',
  '04-campaign.jpg',
  '05-wayfinding.jpg'
].map(file => `${import.meta.env.BASE_URL}assets/cases/5200/${file}`);

export default function ProjectDetail({ project, onClose, onNext }) {
  const isSample = project.title.startsWith('5200');
  const images = isSample ? sampleImages : [project.image, project.image, project.image];

  return (
    <article className="case-page" aria-label={`${project.title}项目详情`}>
      <header className="case-nav">
        <button type="button" onClick={onClose}>← 返回作品星球</button>
        <span>ZShonz / Selected work</span>
        <span>{project.field}</span>
      </header>

      <section className="case-hero">
        <p className="case-index">PROJECT / {String(project.index).padStart(2, '0')}</p>
        <h1>{project.title}</h1>
        <div className="case-hero-meta">
          <p>{project.statement}</p>
          <dl><div><dt>Scope</dt><dd>{project.description}</dd></div><div><dt>Role</dt><dd>Brand direction / Visual design</dd></div></dl>
        </div>
        <img src={project.image} alt={`${project.title}项目封面`} />
      </section>

      <section className="case-story">
        <p>01 / Context</p>
        <h2>{project.caseTitle}</h2>
        <div className="case-story-copy">
          <p>{project.caseIntro}</p>
          <p>{isSample ? '以“我爱，我选择”为核心表达，将新一代年轻人的个性选择转化为标志、文字、空间导视与传播画面。' : '此页已建立完整案例结构，后续可直接替换为该项目的策略、识别系统与应用图片。'}</p>
        </div>
      </section>

      <section className={`case-gallery ${isSample ? 'case-gallery-real' : 'case-gallery-placeholder'}`}>
        {images.map((image, index) => (
          <figure key={`${image}-${index}`} className={`case-frame case-frame-${index + 1}`}>
            <img src={image} alt={`${project.title}案例展开 ${index + 1}`} loading="lazy" />
            {!isSample && <figcaption>CONTENT SLOT / {String(index + 1).padStart(2, '0')}</figcaption>}
          </figure>
        ))}
      </section>

      <section className="case-outro">
        <p>Next project</p>
        <button type="button" onClick={onNext}>{project.nextTitle}<span>↗</span></button>
      </section>
    </article>
  );
}
