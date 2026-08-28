import { useState, useEffect } from 'react';
import { createShare, listShares, revokeShare, createLinkShare } from '../services/shareService';

export default function ShareModal({ file, onClose }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('VIEWER');
  const [shares, setShares] = useState([]);
  const [loadingShares, setLoadingShares] = useState(true);
  const [shareError, setShareError] = useState('');

  const [linkPassword, setLinkPassword] = useState('');
  const [linkExpiry, setLinkExpiry] = useState('');
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkError, setLinkError] = useState('');

  const loadShares = async () => {
    setLoadingShares(true);
    try {
      const res = await listShares(file.id);
      setShares(res.data);
    } catch {
      // owner-only endpoint — if this user isn't the owner, just show nothing
      setShares([]);
    } finally {
      setLoadingShares(false);
    }
  };

  useEffect(() => {
    loadShares();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file.id]);

  const handleShare = async (e) => {
    e.preventDefault();
    setShareError('');
    try {
      await createShare(file.id, email, role);
      setEmail('');
      loadShares();
    } catch (err) {
      setShareError(err.response?.data?.message || 'Could not share — check the email address.');
    }
  };

  const handleRevoke = async (shareId) => {
    await revokeShare(shareId);
    loadShares();
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    setLinkError('');
    try {
      const res = await createLinkShare(
        file.id,
        linkPassword || null,
        linkExpiry ? Number(linkExpiry) : null
      );
      setGeneratedLink(`${window.location.origin}${res.data.publicUrl}`);
    } catch (err) {
      setLinkError(err.response?.data?.message || 'Could not create link.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-900">Share "{file.name}"</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl leading-none">
            ✕
          </button>
        </div>

        {/* Direct user sharing */}
        <form onSubmit={handleShare} className="flex gap-2 mb-3">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-2 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="VIEWER">Viewer</option>
            <option value="EDITOR">Editor</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            Share
          </button>
        </form>
        {shareError && <p className="text-red-600 text-xs mb-3">{shareError}</p>}

        <div className="mb-6">
          <p className="text-xs font-medium text-slate-500 mb-2">People with access</p>
          {loadingShares && <p className="text-xs text-slate-400">Loading...</p>}
          {!loadingShares && shares.length === 0 && (
            <p className="text-xs text-slate-400">Not shared with anyone yet.</p>
          )}
          <div className="space-y-1">
            {shares.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-2"
              >
                <span className="text-slate-700">
                  {s.sharedWithEmail} <span className="text-slate-400">· {s.role}</span>
                </span>
                <button
                  onClick={() => handleRevoke(s.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-200 mb-4" />

        {/* Public link */}
        <p className="text-xs font-medium text-slate-500 mb-2">Or create a public link</p>
        <form onSubmit={handleCreateLink} className="space-y-2 mb-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Password (optional)"
              value={linkPassword}
              onChange={(e) => setLinkPassword(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
            <input
              type="number"
              placeholder="Expires in hrs (optional)"
              value={linkExpiry}
              onChange={(e) => setLinkExpiry(e.target.value)}
              className="w-40 px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white text-sm py-2 rounded-lg hover:bg-slate-900"
          >
            Generate Link
          </button>
        </form>
        {linkError && <p className="text-red-600 text-xs">{linkError}</p>}

        {generatedLink && (
          <div className="bg-slate-50 rounded-lg p-3 mt-2 text-xs break-all">
            {generatedLink}
          </div>
        )}
      </div>
    </div>
  );
}