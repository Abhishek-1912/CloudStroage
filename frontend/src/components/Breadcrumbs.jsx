import { Link } from 'react-router-dom';

export default function Breadcrumbs({ trail }) {
  return (
    <div className="flex items-center gap-2 text-sm mb-4 text-slate-500">
      <Link to="/drive" className="hover:text-slate-900 hover:underline">
        My Drive
      </Link>
      {trail.map((item) => (
        <span key={item.id} className="flex items-center gap-2">
          <span>/</span>
          <Link to={`/drive/${item.id}`} className="hover:text-slate-900 hover:underline">
            {item.name}
          </Link>
        </span>
      ))}
    </div>
  );
}