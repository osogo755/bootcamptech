import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Send,
  Video,
  Award
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { MENTORS } from '../../data/programsData';
import { triggerConfetti } from '../../utils/confetti';

export const MentorshipTab: React.FC = () => {
  const { currentStudent, bookMentorSlot } = useStudent();
  const [selectedMentor, setSelectedMentor] = useState(MENTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState(MENTORS[0].availableSlots[0]);
  const [topic, setTopic] = useState('Senior Capstone Architecture & Code Review');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Community Forum State
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 'p-1',
      author: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      time: '2 hours ago',
      title: 'How to bypass Cloudflare WAF token inspection on blind SSRF payloads?',
      content: 'In the Week 3 lab, I am trying to extract IMDSv1 metadata but the request header Host header is being stripped by the proxy. Has anyone tried chunked transfer encoding?',
      replies: [
        {
          author: 'Alexandre Dubois (CrowdStrike / Faculty)',
          content: 'Great question Marcus. Try double URL-encoding the localhost target or use a custom DNS A record that resolves to 169.254.169.254 to bypass the string regex.',
          time: '1 hour ago'
        }
      ]
    },
    {
      id: 'p-2',
      author: 'Amina Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      time: '4 hours ago',
      title: 'Optuna pruning strategy for XGBoost regression over 100 trials',
      content: 'Anyone notice that MedianPruner prunes promising deep trees too early during the first 10 warmup iterations? Switching to Hyperband solved it for me.',
      replies: [
        {
          author: 'Dr. Priya Patel (Faculty)',
          content: 'Spot on Amina! Hyperband handles non-monotonic learning curves significantly better for tree ensembles.',
          time: '3 hours ago'
        }
      ]
    }
  ]);

  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');

  if (!currentStudent) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookMentorSlot(selectedMentor.name, topic, selectedSlot);
    triggerConfetti();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 2500);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    const newPost = {
      id: `p-${Date.now()}`,
      author: currentStudent.name,
      avatar: currentStudent.avatar,
      time: 'Just now',
      title: newQuestionTitle,
      content: newQuestionContent,
      replies: [
        {
          author: `${selectedMentor.name} (Faculty Mentor)`,
          content: `Thanks for posting this, ${currentStudent.name.split(' ')[0]}! Looking forward to reviewing this during our upcoming session. Review module documentation for architecture patterns.`,
          time: 'Just now'
        }
      ]
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    triggerConfetti();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-2">
            1-ON-1 FACULTY &amp; PEER NETWORK
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Mentorship &amp; Cohort Community</h2>
          <p className="text-xs text-slate-400 mt-1">
            Book private 45-minute architectural consultations and collaborate with cohort colleagues.
          </p>
        </div>
      </div>

      {/* Grid: Mentor Booking & Booked Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Book 1-on-1 */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Book 1-on-1 Staff Office Hours</h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Free with Enrollment
            </span>
          </div>

          {bookingSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Office hours session confirmed! Added to your schedule and Google Calendar invitation dispatched.</span>
            </div>
          )}

          <form onSubmit={handleBook} className="space-y-4">
            {/* Select Mentor */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Available Faculty Mentor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MENTORS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMentor(m);
                      setSelectedSlot(m.availableSlots[0]);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                      selectedMentor.id === m.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{m.name}</div>
                      <div className="text-[11px] text-indigo-400">{m.company}</div>
                      <div className="text-[10px] text-slate-400 truncate">{m.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Time Slot for {selectedMentor.name}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedMentor.availableSlots.map((slot: string) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2 rounded-xl border text-xs text-center transition-colors cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-indigo-600 text-white font-semibold border-indigo-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Consultation Topic */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Consultation Agenda / Project Focus
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Capstone Architecture Review, Code Optimization, Interview Prep"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm 1-on-1 Booking ({selectedSlot})</span>
            </button>
          </form>
        </div>

        {/* Right 5 Cols: Booked Sessions */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Your Upcoming Mentorship Slots</h3>
            <p className="text-xs text-slate-400 mb-4">
              Private 1-on-1 links will be activated 10 minutes prior to session.
            </p>

            <div className="space-y-3">
              {currentStudent.bookedSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{session.mentorName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">{session.topic}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{session.datetime}</span>
                  </div>
                </div>
              ))}

              {currentStudent.bookedSessions.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  No upcoming mentor sessions booked yet. Select a faculty member on the left!
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 text-xs text-slate-400 leading-relaxed">
            Faculty mentors hold active roles at Google, Stripe, and CrowdStrike. Sessions include code architecture evaluations and interview readiness.
          </div>
        </div>

      </div>

      {/* Cohort Discussion Forum Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Cohort Discussion &amp; Technical Q&amp;A</h3>
          </div>
          <p className="text-xs text-slate-400">
            Ask technical questions, share benchmark findings, and get answers from cohort peers and instructors.
          </p>
        </div>

        {/* Post question form */}
        <form onSubmit={handlePostQuestion} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <input
            type="text"
            required
            value={newQuestionTitle}
            onChange={(e) => setNewQuestionTitle(e.target.value)}
            placeholder="Ask a technical question or share an insight..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            rows={2}
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
            placeholder="Provide context, error logs, or code details..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post to Cohort</span>
            </button>
          </div>
        </form>

        {/* Community Posts */}
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold text-white">{post.author}</span>
                    <span className="text-[10px] text-slate-400 ml-2">{post.time}</span>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-indigo-300">{post.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

              {/* Replies */}
              {post.replies && post.replies.length > 0 && (
                <div className="pl-4 border-l-2 border-indigo-500/40 space-y-2 pt-2 mt-2">
                  {post.replies.map((reply, i) => (
                    <div key={i} className="text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-emerald-400">{reply.author}</span>
                        <span className="text-[10px] text-slate-500">{reply.time}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
