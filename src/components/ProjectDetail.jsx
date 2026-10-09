import mossaneeGallery from '../mossanee-gallery.json';
import jinxiuxiangGallery from '../jinxiuxiang-gallery.json';
import linjilinliGallery from '../linjilinli-gallery.json';
import baozhuangyuanGallery from '../baozhuangyuan-gallery.json';

import yuexiGallery from '../5200-gallery.json';
import winkGallery from '../wink-gallery.json';
import kapteynGallery from '../kapteyn-gallery.json';
import adaGallery from '../ada-gallery.json';
import juvtaGallery from '../juvta-gallery.json';
import joysGallery from '../joys-gallery.json';

const joysImages = joysGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/joys/${file}`, width, height
}));

const juvtaImages = juvtaGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/juvta/${file}`, width, height
}));

const adaImages = adaGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/ada/${file}`, width, height
}));

const kapteynImages = kapteynGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/kapteyn/${file}`, width, height
}));

const winkImages = winkGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/wink/${file}`, width, height
}));

const yuexiImages = yuexiGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/5200/${file}`, width, height
}));

const mossaneeImages = mossaneeGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/mossanee/${file}`, width, height
}));
const jinxiuxiangImages = jinxiuxiangGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/jinxiuxiang/${file}`, width, height
}));
const linjilinliImages = linjilinliGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/linjilinli/${file}`, width, height
}));
const baozhuangyuanImages = baozhuangyuanGallery.map(({file, width, height}) => ({
  src: `${import.meta.env.BASE_URL}assets/cases/baozhuangyuan/${file}`, width, height
}));

export default function ProjectDetail({ project, onClose, onNext }) {
  const images = project.caseKey === 'mossanee' ? mossaneeImages.slice(0, 27) : project.caseKey === 'jinxiuxiang' ? jinxiuxiangImages : project.caseKey === 'linjilinli' ? linjilinliImages : project.caseKey === 'baozhuangyuan' ? baozhuangyuanImages : project.caseKey === '5200' ? yuexiImages : project.caseKey === 'wink' ? winkImages : project.caseKey === 'kapteyn' ? kapteynImages : project.caseKey === 'ada' ? adaImages : project.caseKey === 'juvta' ? juvtaImages : project.caseKey === 'joys' ? joysImages : [];
  const culturalImages = project.caseKey === 'mossanee' ? mossaneeImages.slice(27) : [];

  return (
    <article className="case-page" aria-label={`${project.title}项目详情`}>
      <header className="case-nav">
        <button type="button" onClick={onClose}>← 返回品牌展厅</button>
        <span>ZShonz / Brands</span>
        <span>{project.field}</span>
      </header>

      <section className="case-hero">
        <img src={project.image} alt={`${project.title}项目封面`} />
      </section>

      <section className="case-overview">
        <div className="case-overview-info">
          <p className="case-index">PROJECT / {String(project.index).padStart(2, '0')}</p>
          <h1>{project.title}</h1>
          <p className="case-overview-statement">{project.statement}</p>
          <dl className="case-overview-details">
            <div><dt>Scope</dt><dd>{project.description}</dd></div>
            <div><dt>Role</dt><dd>{project.role || 'Brand direction / Visual design'}</dd></div>
          </dl>
        </div>
        <div className="case-overview-context">
          <p className="case-context-label">Context / 背景</p>
          {!project.contextParagraphs && <h2>{project.caseTitle}</h2>}
          <div className="case-story-copy">
            {project.contextParagraphs ? project.contextParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>{project.caseIntro}</p>}
          </div>
        </div>
      </section>

      {!images.length && <p className="case-availability">完整案例整理中。</p>}
      <section className="case-gallery">
        {images.map((image, index) => (
          <figure key={image.src} className={`case-frame case-frame-${index + 1}`}>
            <img src={image.src} width={image.width} height={image.height} alt={`${project.title}案例展开 ${index + 1}`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </section>

      {culturalImages.length > 0 && <section className="case-cultural" aria-labelledby="cultural-title">
        <h2 id="cultural-title" className="case-section-title">文创设计</h2>
        <div className="case-gallery">
          {culturalImages.map((image, index) => <figure key={image.src} className="case-frame">
            <img src={image.src} width={image.width} height={image.height} alt={`${project.title}文创设计 ${index + 28}`} loading="lazy" decoding="async" />
          </figure>)}
        </div>
      </section>}

      <section className="case-outro">
        <p>Next project</p>
        <button type="button" onClick={onNext}>{project.nextTitle}<span>↗</span></button>
      </section>
    </article>
  );
}


