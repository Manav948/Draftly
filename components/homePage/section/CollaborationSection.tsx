"use client";

const activityFeed = [
  { action: "Updated", item: '"Q3 Roadmap Mind Map"', channel: "in Client Alpha", time: "2m ago" },
  { action: "Completed", item: '"Implement i18n Next-intl"', channel: "", time: "14m ago" },
  { action: "Switched workspace", item: '"Personal Productivity"', channel: "", time: "1h ago" },
];

export default function CollaborationSection() {
  return (
    <div className="relative w-full" style={{ background: "#0c0c0c", backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>COLLABORATION</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">Collaboration<br />made simple.</h2>
            <p className="text-[#737373] text-lg leading-relaxed">
              Manage workspace-level permissions and assignments. Assign mind maps and tasks to users, track updates, and keep everyone aligned without the noise of typical project management tools.
            </p>
          </div>
          <div className="activity-feed lg:col-span-7">
            <div className="bg-[#0f0f0f] border border-[#1d1d1d] rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1d1d1d]">
                <span className="text-white text-sm font-medium">Team Activity</span>
                <span className="text-[#404040] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>LIVE</span>
              </div>
              <div className="divide-y divide-[#141414]">
                {activityFeed.map((item, i) => (
                  <div key={i} className="activity-item flex items-center gap-4 px-5 py-4 hover:bg-[#111] transition-colors duration-150">
                    <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#222] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#737373] text-xs font-bold">{item.action[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">
                        <span className="text-[#737373]">{item.action} </span>
                        <span className="font-medium">{item.item}</span>
                        {item.channel && <span className="text-[#737373]"> {item.channel}</span>}
                      </p>
                    </div>
                    <span className="text-[#404040] text-xs flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace" }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
