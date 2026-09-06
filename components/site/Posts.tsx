import Link from 'next/link';
import { asset } from '@/lib/asset';
import type { SiteContent } from '@/lib/site-content';

export default function Posts({ posts }: { posts: SiteContent['posts'] }) {
  return (
    <section id="posts" className="section" aria-labelledby="posts-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{posts.eyebrow}</p>
          <h2 id="posts-title" className="section-title">{posts.title}</h2>
          <p className="section-lead">{posts.lead}</p>
        </div>

        <ul className="card-grid card-grid-3 reveal-stagger">
          {posts.items.map((post) => (
            <li key={post.title} className="post-card">
              <div className="post-media">
                <img src={asset(post.image.src)} alt={post.image.alt} width={1200} height={750} loading="lazy" />
              </div>
              <div className="post-body">
                <p className="post-meta">
                  <span className="post-category">{post.category}</span>
                  {' · '}
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </p>
                <h3 className="post-title"><a href={asset(post.href)}>{post.title}</a></h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <p className="post-more">
                  <span className="arrow-link" aria-hidden="true">לקריאה</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="section-more">
          <Link className="btn btn-secondary" href={asset('/blog')}>
            לכל המאמרים
            <span className="btn-arrow" aria-hidden="true">←</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
