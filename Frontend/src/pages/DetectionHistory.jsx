import { useEffect, useState } from "react";

export default function DetectionHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center tracking-wide uppercase">
        Detection History
      </h1>

      {/* ================= Desktop View ================= */}
      <div className="hidden md:block bg-[#111] rounded-xl overflow-hidden border border-[#1f1f1f] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <table className="w-full text-sm text-gray-300 border-collapse">
          <thead className="bg-[#1a1a1a] text-gray-400 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="p-4 text-left w-1/2">Text</th>
              <th className="p-4 text-center">Score</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Time</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1f1f1f]">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500 italic">
                  No detection history data logs available.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => {
                const rawDate = log.createdAt || log.timestamp;
                const formattedDate = rawDate
                  ? new Date(rawDate).toLocaleString()
                  : "Invalid Date";

                let rawScore = Number(log.toxicityScore) || 0;
                let formattedScore = "0.0%";

                if (rawScore > 0 && rawScore <= 1) {
                  formattedScore = `${(rawScore * 100).toFixed(1)}%`;
                } else if (rawScore > 1) {
                  formattedScore = `${rawScore.toFixed(1)}%`;
                }

                // Works for BOTH old and new models
                const category = (log.category || "").trim().toLowerCase();

                const isHate =
                  category === "hate speech" ||
                  category === "hate" ||
                  category === "hateful" ||
                  category === "offensive";

                return (
                  <tr
                    key={log._id || index}
                    className="hover:bg-[#141414] transition-colors duration-200"
                  >
                    <td className="p-4 text-left break-all">
                      {log.content}
                    </td>

                    <td className="p-4 text-center font-mono text-gray-100">
                      {formattedScore}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${
                          isHate
                            ? "bg-[#ff4d4d15] text-[#ff4d4d] border border-[#ff4d4d30]"
                            : "bg-[#39d35315] text-[#39d353] border border-[#39d35330]"
                        }`}
                      >
                        {isHate ? "Hate Speech" : "Clean"}
                      </span>
                    </td>

                    <td className="p-4 text-center text-xs text-gray-500 font-mono whitespace-nowrap">
                      {formattedDate}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile View ================= */}

      <div className="block md:hidden space-y-4">
        {logs.length === 0 ? (
          <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-8 text-center text-gray-500 italic">
            No detection history data logs available.
          </div>
        ) : (
          logs.map((log, index) => {
            const rawDate = log.createdAt || log.timestamp;
            const formattedDate = rawDate
              ? new Date(rawDate).toLocaleString()
              : "Invalid Date";

            let rawScore = Number(log.toxicityScore) || 0;
            let formattedScore = "0.0%";

            if (rawScore > 0 && rawScore <= 1) {
              formattedScore = `${(rawScore * 100).toFixed(1)}%`;
            } else if (rawScore > 1) {
              formattedScore = `${rawScore.toFixed(1)}%`;
            }

            const category = (log.category || "").trim().toLowerCase();

            const isHate =
              category === "hate speech" ||
              category === "hate" ||
              category === "hateful" ||
              category === "offensive";

            return (
              <div
                key={log._id || index}
                className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5 shadow-lg flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isHate
                        ? "bg-[#ff4d4d15] text-[#ff4d4d] border border-[#ff4d4d30]"
                        : "bg-[#39d35315] text-[#39d353] border border-[#39d35330]"
                    }`}
                  >
                    {isHate ? "Hate Speech" : "Clean"}
                  </span>

                  <span className="font-mono text-sm font-bold text-gray-100">
                    {formattedScore}
                  </span>
                </div>

                <div>
                  <span className="block text-xs text-gray-500 uppercase mb-1">
                    Flagged Text
                  </span>

                  <p className="bg-[#161616] border border-[#1c1c1c] rounded-lg p-3 text-gray-300">
                    {log.content}
                  </p>
                </div>

                <div className="text-right text-[11px] text-gray-500 font-mono">
                  {formattedDate}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}