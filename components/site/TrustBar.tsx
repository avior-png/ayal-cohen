import { trust } from '@/content/site';

/**
 * רצועת האוטוריטה. הפאנל עולה על תחתית ההיררו במרווח שלילי —
 * התפר בין הסקשן הכהה לבהיר הופך לאלמנט מכוון במקום לקו יבש.
 */
export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="נתונים בקצרה">
      <div className="container">
        <div className="trust-panel">
          <ul className="trust-list">
            {trust.map((item) => (
              <li key={item.label} className="trust-item">
                <span className="trust-value">{item.value}</span>
                <span className="trust-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
