export const packagingProjects = {
  arhats: { title: '十八罗汉', index: '05', files: Array.from({length: 11}, (_, i) => `${String(i + 1).padStart(2, '0')}.jpg`) },
  fengtai: { title: '丰泰云鼎', index: '04', files: ['01.jpg', '02.jpg'] },
  'red-land': { title: '红色江山', index: '03', files: Array.from({length: 5}, (_, i) => `${String(i + 1).padStart(2, '0')}.jpg`) },
  richchoc: { title: '浓浓黑巧', index: '01', files: ['01-6e82ed0cf6.gif', '01-8c9e5edd1b.jpg', '02.jpg', '03-5ce336d0fa.jpg', '04.jpg', '05.jpg', '06.jpg'] },
  'lucky-cider': { title: '今日宜', index: '02', files: ['01-5204eee408.jpg', '02-5b56501ecb.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg'] }
};

export default function PackagingDetail({ caseKey = 'richchoc' }) {
  const { title, index, files } = packagingProjects[caseKey];
  const asset = file => `${import.meta.env.BASE_URL}assets/cases/${caseKey}/${file}`;
  return <article className="case-page" aria-label={`${title}包装设计`}>
    <header className="case-nav"><a href="#objects">← 返回器物展厅</a><span>ZShonz / Objects</span><span>包装设计</span></header>
    <section className="case-overview"><div className="case-overview-info"><p className="case-index">PACKAGE / {index}</p><h1>{title}</h1></div></section>
    <section className="case-gallery">{files.map(file => <figure className="case-frame" key={file}><img src={asset(file)} alt={`${title}包装设计 ${file}`} loading="lazy" decoding="async" /></figure>)}</section>
    <a className="plain-link" href="#objects">返回器物展厅 ↗</a>
  </article>;
}

