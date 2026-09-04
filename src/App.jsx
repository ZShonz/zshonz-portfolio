import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteMenu from './components/InfiniteMenu';
import ModelStage from './components/ModelStage';
import ProjectDetail from './components/ProjectDetail';

const asset = path => `${import.meta.env.BASE_URL}assets/${path}`;

const projects = [
  { image: '/assets/mossanee.jpg', title: '茉山语', description: '品牌全案 / 策略 / 视觉 / 包装', field: '零食食品 · 品牌全案', statement: '分享新鲜零食，也分享新鲜事。', caseTitle: '从一颗零食，建立轻松而可持续的品牌语言。', caseIntro: '通过品牌定位、命名表达与包装系统，让茉山语在零食场景中具备精神记忆点。' },
  { image: '/assets/wink.jpg', title: 'Wink 顽客', description: '品牌全案 / 文化场景 / 活动传播', field: '酒饮文化 · 品牌全案', statement: 'Keep Wink, Music & Drink.', caseTitle: '让酒饮、音乐与夜间文化共用一套视觉节奏。', caseIntro: '以场景体验为核心，建立从品牌识别到活动传播的完整视觉系统。' },
  { image: '/assets/kapteyn.jpg', title: 'Kapteyn 卡普坦', description: '品牌识别 / 科技产品 / 视觉系统', field: '智能产品 · 品牌识别', statement: 'Your health navigator.', caseTitle: '把复杂的智能健康技术，转译为清晰可信的识别系统。', caseIntro: '从产品定位出发，建立适用于产品、包装与数字界面的科技品牌语言。' },
  { image: '/assets/ada.jpg', title: 'ADA Overland', description: '品牌识别 / 户外生活 / 品牌体验', field: '户外生活 · 品牌识别', statement: 'Abode. Discover. Adventure.', caseTitle: '为行动中的探索者，建立一套可靠、开放的户外识别。', caseIntro: '以屋顶帐篷的结构与地形感为线索，将品牌识别延伸至产品和户外触点。' },
  { image: '/assets/juvta.jpg', title: 'JUVTA', description: '品牌识别 / 美容科技 / 艺术指导', field: '美妆科技 · 品牌识别', statement: 'Beauty up to her.', caseTitle: '用当代识别系统，重新组织科技美学与女性表达。', caseIntro: '通过字标、色彩与影像方向，建立理性产品力与感性美学的平衡。' },
  { image: '/assets/5200.jpg', title: '5200 宴会空间', description: '品牌全案 / 空间 / 导视 / 体验', field: '商业空间 · 品牌全案', statement: '我爱，我选择。', caseTitle: '新一代年轻人，定义自己的爱情与宴会空间。', caseIntro: '品牌从名称中的“5200”出发，将无限符号、选择与年轻情感转化为完整品牌系统。' },
  { image: '/assets/jinxiuxiang.jpg', title: '真秀香', description: '品牌全案 / 餐饮 / 文化识别', field: '餐饮 · 品牌全案', statement: '飞越 3618 公里，把好吃的从延边带到深圳。', caseTitle: '让地域文化不止是装饰，而是餐饮品牌的核心识别。', caseIntro: '梳理菜品、人情与地域记忆，建立从门店形象到用餐体验的品牌全案。' },
  { image: '/assets/linjilinli.jpg', title: '林记邻里', description: '品牌全案 / 餐饮 / 在地叙事', field: '餐饮 · 品牌全案', statement: '林记六大拿手菜，街坊来代言。', caseTitle: '把邻里间的熟悉感，变成一家餐厅的品牌资产。', caseIntro: '通过街坊口吻、招牌式字体与在地内容，搭建具有人情味的餐饮品牌系统。' }
].map((project, index) => ({
  ...project,
  image: `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`,
  index: index + 1
}));

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = event => setReduced(event.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

function App() {
  const reducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [portalProject, setPortalProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = useCallback(project => {
    if (reducedMotion) {
      setSelectedProject(project);
      return;
    }
    setPortalProject(project);
  }, [reducedMotion]);

  useEffect(() => {
    if (!portalProject) return undefined;
    const openTimer = window.setTimeout(() => setSelectedProject(portalProject), 620);
    const clearTimer = window.setTimeout(() => setPortalProject(null), 980);
    return () => { window.clearTimeout(openTimer); window.clearTimeout(clearTimer); };
  }, [portalProject]);

  useEffect(() => {
    document.body.classList.toggle('case-open', Boolean(selectedProject));
    if (selectedProject) window.history.replaceState(null, '', `#project-${selectedProject.index}`);
    return () => document.body.classList.remove('case-open');
  }, [selectedProject]);

  const detailedProject = useMemo(() => {
    if (!selectedProject) return null;
    const next = projects[selectedProject.index % projects.length];
    return { ...selectedProject, nextTitle: next.title };
  }, [selectedProject]);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    window.history.replaceState(null, '', '#work');
  }, []);

  const nextProject = useCallback(() => {
    if (!selectedProject) return;
    setSelectedProject(projects[selectedProject.index % projects.length]);
    document.querySelector('.case-page')?.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion, selectedProject]);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <>
      <a className="skip-link" href="#main">跳转到主要内容</a>
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">ZShonz<span>®</span></a>
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#about">Profile</a>
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
        </nav>
        <a className="nav-cta" href="#contact">Contact <span>↗</span></a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-object-wrap">
            <ModelStage src={asset('models/zshonz-shoe.glb')} className="hero-model" label="ZShonz 鞋履 3D 旋转模型" rotation={[-0.18, -0.65, 0.08]} fit={1.72} speed={0.28} cameraZ={3.5} />
            <div className="hero-object-caption"><span>01 / PERSONAL OBJECT</span><span>Drag your eyes, not the object</span></div>
          </div>
          <div className="hero-title-wrap">
            <p className="hero-kicker hero-beat">HELLO, I AM ZSHONZ</p>
            <h1 className="hero-beat hero-beat-title"><span>Ideas into</span><em>identity.</em></h1>
            <p className="hero-cn hero-beat hero-beat-copy">把策略变成辨识度，把视觉扩展成可持续使用的品牌系统。</p>
            <a className="primary-button hero-beat hero-beat-cta" href="#about">About me <span>↘</span></a>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="portrait reveal">
            <div className="profile-card-label">ZSHONZ PROFILE</div>
            <ModelStage src={asset('models/portrait.glb')} className="portrait-model" label="钟修治 3D 个人头像" rotation={[0.02, 3.12, 0]} fit={2.2} speed={0.035} cameraZ={3.25} />
            <div className="portrait-caption">钟修治<br />Brand designer</div>
          </div>
          <div className="about-copy reveal">
            <p className="about-eyebrow">About</p>
            <h2>专注品牌视觉与<br /><em>AI 创意落地。</em></h2>
            <p className="about-summary">我是钟修治，专注品牌识别与视觉系统。工作覆盖消费品牌、餐饮、空间、智能产品与生活方式，并使用 AI 扩展研究和视觉原型。</p>
            <div className="profile-facts">
              <article><span>身份</span><strong>视觉设计师 / AI 设计师 / 品牌设计师</strong></article>
              <article><span>方向</span><strong>品牌识别 / 商业视觉 / AIGC 工作流 / 内容视觉</strong></article>
              <article><span>能力</span><strong>策略梳理 / 视觉概念 / 系统设计 / 落地延展</strong></article>
            </div>
            <a className="text-link" href="#work">View selected work <span>↘</span></a>
          </div>
        </section>

        <section className="work-section menu-work-section" id="work">
          <div className="work-intro reveal">
            <div className="active-project-copy" key={activeProject.title} aria-live="polite">
              <h2>{activeProject.title}</h2>
              <p>{activeProject.description}</p>
            </div>
          </div>

          <div className="menu-stage reveal">
            <div className="menu-stage-meta" aria-hidden="true"><span>DRAG TO EXPLORE</span><span>{projects.length} PROJECT CARDS</span></div>
            {reducedMotion ? (
              <div className="motion-fallback">
                {projects.slice(0, 4).map(project => <img key={project.title} src={project.image} alt="" />)}
              </div>
            ) : (
              <InfiniteMenu
                items={projects}
                scale={1.5}
                backgroundColor="#0b0d0e"
                onActiveItemChange={setActiveProject}
                onItemSelect={openProject}
              />
            )}
          </div>

          <div className="project-shelf reveal" id="project-index" aria-label="作品项目目录">
            {projects.map(project => (
              <button type="button" onClick={() => openProject(project)} key={project.title}>
                <div className="shelf-image"><img src={project.image} alt={`${project.title}品牌项目视觉`} loading="lazy" /></div>
                <strong>{project.title}</strong>
                <span>{project.field}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="capabilities-heading reveal"><h2>我如何建立品牌。</h2><p>从问题定义开始，让每一次视觉选择都有明确理由。</p></div>
          <div className="capabilities-list">
            <article className="capability reveal"><h3>Brand Thinking</h3><p>从行业、人群与竞争关系中，找到品牌应该占据的位置。</p></article>
            <article className="capability reveal"><h3>Visual Systems</h3><p>建立标志、字体、色彩、图形与影像之间可延展的秩序。</p></article>
            <article className="capability reveal"><h3>Experience Expansion</h3><p>将核心识别延伸到包装、空间、传播和数字接触点。</p></article>
            <article className="capability reveal"><h3>AI Creative Workflow</h3><p>使用 AI 扩展研究与原型效率，并保留人的判断与质量控制。</p></article>
          </div>
          <div className="process reveal" aria-label="工作流程"><span>Discover</span><i /><span>Define</span><i /><span>Design</span><i /><span>Expand</span><i /><span>Deliver</span></div>
        </section>

        <section className="contact-section" id="contact">
          <p className="contact-kicker reveal">Have a project in mind?</p>
          <h2 className="reveal">做一个值得<br /><em>被记住的品牌。</em></h2>
          <div className="contact-bottom reveal">
            <a href="mailto:2731277468@qq.com">2731277468@qq.com <span>↗</span></a>
            <p>品牌设计 / 视觉系统 / AI 创意<br />深圳</p>
            <a className="back-top" href="#top">Back to top ↑</a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">ZSHONZ</div>
        </section>
      </main>

      {portalProject && (
        <div className="project-portal" aria-hidden="true">
          <img src={portalProject.image} alt="" />
          <div><span>ENTERING PROJECT</span><strong>{portalProject.title}</strong></div>
        </div>
      )}

      {detailedProject && <ProjectDetail project={detailedProject} onClose={closeProject} onNext={nextProject} />}
    </>
  );
}

export default App;
