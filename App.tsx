
// import React, { useState, useEffect, useRef } from 'react';
// import { User, UserRole } from './types';
// import { MockDB } from './services/MockDB';
// import Login from './views/Auth/Login';
// // import {api} from './services/api';
// import PassengerDashboard from './views/Passenger/Dashboard';
// import AdminDashboard from './views/Admin/AdminDashboard';
// import TCDashboard from './views/TC/TCDashboard';
// import { LogOut, Train, ShieldCheck, User as UserIcon, Settings, UserCircle, ChevronDown, LayoutDashboard } from 'lucide-react';
// import ProfileView from './components/ProfileView';

// const App: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [initialized, setInitialized] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [view, setView] = useState<'DASHBOARD' | 'PROFILE' | 'EDIT_PROFILE'>('DASHBOARD');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     MockDB.init();
//     setUser(MockDB.getCurrentUser());
//     setInitialized(true);
    
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setShowProfileMenu(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//   setUser(null);
//   setShowProfileMenu(false);
//   setView('DASHBOARD');
//   };

//   if (!initialized) return null;
//   if (!user) return <Login onLogin={setUser} />;

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans'] text-slate-900">
//       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 md:px-12 flex justify-between items-center card-shadow">
//         <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('DASHBOARD')}>
//           <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
//             <Train className="w-5 h-5" />
//           </div>
//           <div>
//             <h1 className="text-xl font-black tracking-tighter text-blue-600 uppercase italic leading-none">Station Track</h1>
//             <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Railway Verification System</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="relative" ref={dropdownRef}>
//             <button 
//               onClick={() => setShowProfileMenu(!showProfileMenu)}
//               className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200"
//             >
//               <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 border border-slate-200">
//                 <UserIcon className="w-5 h-5" />
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-0.5">{user.name}</p>
//                 <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{user.role.replace('_', ' ')}</p>
//               </div>
//               <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
//             </button>

//             {showProfileMenu && (
//               <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <div className="px-4 py-3 border-b border-slate-100 mb-1">
//                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Logged in as</p>
//                   <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
//                 </div>
//                 <button onClick={() => { setView('DASHBOARD'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
//                   <LayoutDashboard className="w-4 h-4" /> Dashboard
//                 </button>
//                 <button onClick={() => { setView('PROFILE'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
//                   <UserCircle className="w-4 h-4" /> View Profile
//                 </button>
//                 <button onClick={() => { setView('EDIT_PROFILE'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
//                   <Settings className="w-4 h-4" /> Edit Profile
//                 </button>
//                 <div className="h-px bg-slate-100 my-1"></div>
//                 <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors">
//                   <LogOut className="w-4 h-4" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <main className="flex-1 overflow-auto relative p-6 md:p-12">
//         <div className="max-w-7xl mx-auto">
//           {view === 'DASHBOARD' ? (
//             <>
//               {user.role === UserRole.PASSENGER && <PassengerDashboard user={user} />}
//               {(user.role === UserRole.ADMIN || user.role === UserRole.ROOT_ADMIN) && <AdminDashboard user={user} />}
//               {user.role === UserRole.TC && <TCDashboard user={user} />}
//             </>
//           ) : (
//             <ProfileView 
//               user={user} 
//               editMode={view === 'EDIT_PROFILE'} 
//               onClose={() => setView('DASHBOARD')}
//               onUpdate={(updated) => { setUser(updated); setView('PROFILE'); }}
//             />
//           )}
//         </div>
//       </main>

//       <footer className="bg-white border-t border-slate-200 py-10 text-center">
//         <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em]">
//           &copy; {new Date().getFullYear()} Station Track Pro • Unified Global Network
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default App;

// WORKING CODE DONT TOUCH --//

// import React, { useState, useEffect, useRef } from 'react';
// import { User, UserRole } from './types';
// import Login from './views/Auth/Login';
// import PassengerDashboard from './views/Passenger/Dashboard';
// import AdminDashboard from './views/Admin/AdminDashboard';
// import TCDashboard from './views/TC/TCDashboard';
// import ProfileView from './components/ProfileView';

// import {
//   LogOut,
//   Train,
//   User as UserIcon,
//   Settings,
//   UserCircle,
//   ChevronDown,
//   LayoutDashboard
// } from 'lucide-react';

// const App: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [initialized, setInitialized] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [view, setView] = useState<'DASHBOARD' | 'PROFILE' | 'EDIT_PROFILE'>('DASHBOARD');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   /** 🚀 INIT — check for saved login */
//   useEffect(() => {
//     const savedUser = localStorage.getItem("stationTrackUser");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setInitialized(true);

//     /** Close dropdown if click outside */
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setShowProfileMenu(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);

//   }, []);

//   /** 🔐 LOGIN callback */
//   const handleLogin = (loggedInUser: User) => {
//     setUser(loggedInUser);
//     localStorage.setItem("stationTrackUser", JSON.stringify(loggedInUser));
//   };

//   /** 🚪 LOGOUT */
//   const handleLogout = () => {
//     localStorage.removeItem("stationTrackUser");
//     setUser(null);
//     setShowProfileMenu(false);
//     setView('DASHBOARD');
//   };

//   if (!initialized) return null;
//   if (!user) return <Login onLogin={handleLogin} />;

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans'] text-slate-900">

//       {/* NAVBAR */}
//       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 md:px-12 flex justify-between items-center card-shadow">
//         <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('DASHBOARD')}>
//           <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
//             <Train className="w-5 h-5" />
//           </div>
//           <div>
//             <h1 className="text-xl font-black tracking-tighter text-blue-600 uppercase italic leading-none">
//               Station Track
//             </h1>
//             <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
//               Railway Verification System
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setShowProfileMenu(!showProfileMenu)}
//               className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200"
//             >
//               <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 border border-slate-200">
//                 <UserIcon className="w-5 h-5" />
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-0.5">
//                   {user.name}
//                 </p>
//                 <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
//                   {user.role.replace('_', ' ')}
//                 </p>
//               </div>
//               <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
//             </button>

//             {showProfileMenu && (
//               <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <div className="px-4 py-3 border-b border-slate-100 mb-1">
//                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
//                     Logged in as
//                   </p>
//                   <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
//                 </div>
//                 <button
//                   onClick={() => { setView('DASHBOARD'); setShowProfileMenu(false); }}
//                   className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
//                 >
//                   <LayoutDashboard className="w-4 h-4" /> Dashboard
//                 </button>
//                 <button
//                   onClick={() => { setView('PROFILE'); setShowProfileMenu(false); }}
//                   className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
//                 >
//                   <UserCircle className="w-4 h-4" /> View Profile
//                 </button>
//                 <button
//                   onClick={() => { setView('EDIT_PROFILE'); setShowProfileMenu(false); }}
//                   className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
//                 >
//                   <Settings className="w-4 h-4" /> Edit Profile
//                 </button>

//                 <div className="h-px bg-slate-100 my-1"></div>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* DASHBOARD + PROFILE ROUTING */}
//       <main className="flex-1 overflow-auto relative p-6 md:p-12">
//         <div className="max-w-7xl mx-auto">
//           {view === 'DASHBOARD' ? (
//             <>
//               {user.role === UserRole.PASSENGER && <PassengerDashboard user={user} />}
//               {(user.role === UserRole.ADMIN || user.role === UserRole.ROOT_ADMIN) && <AdminDashboard user={user} />}
//               {user.role === UserRole.TC && <TCDashboard user={user} />}
//             </>
//           ) : (
//             <ProfileView
//               user={user}
//               editMode={view === 'EDIT_PROFILE'}
//               onClose={() => setView('DASHBOARD')}
//               onUpdate={(updated) => { setUser(updated); setView('PROFILE'); }}
//             />
//           )}
//         </div>
//       </main>

//       <footer className="bg-white border-t border-slate-200 py-10 text-center">
//         <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em]">
//           &copy; {new Date().getFullYear()} Station Track Pro • Unified Global Network
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default App;
// // WORKING CODE DONT TOUCH ABOVE CODE --//


import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole } from './types';
import Login from './views/Auth/Login';
import PassengerDashboard from './views/Passenger/Dashboard';
import AdminDashboard from './views/Admin/AdminDashboard';
import TCDashboard from './views/TC/TCDashboard';
import ProfileView from './components/ProfileView';
import LandingPage from './views/Landing/LandingPage';


import {
  LogOut,
  Train,
  User as UserIcon,
  Settings,
  UserCircle,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [view, setView] = useState<'DASHBOARD' | 'PROFILE' | 'EDIT_PROFILE'>('DASHBOARD');
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* INIT */
  useEffect(() => {
    const savedUser = localStorage.getItem("stationTrackUser");
    if (savedUser) setUser(JSON.parse(savedUser));
    setInitialized(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem("stationTrackUser", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    localStorage.removeItem("stationTrackUser");
    setUser(null);
    setShowProfileMenu(false);
    setView('DASHBOARD');
  };

  if (!initialized) return null;
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans'] text-slate-900">

      {/* ===================== NAVBAR ===================== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        
        {/* BRAND */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('DASHBOARD')}>
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-blue-600 uppercase italic leading-none">
              Station Track
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
                Public Access v3.5
              </span>
              <span className="text-[9px] font-black text-slate-300">•</span>
              <span className="text-[9px] font-black uppercase text-slate-400">
                by Sivaramakrishnan B (DEV)
              </span>
            </div>
          </div>
        </div>

        {/* PROFILE MENU */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 border border-slate-200 transition-all"
          >
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
              <UserIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[10px] font-black uppercase text-slate-900 leading-none">
                {user.name}
              </p>
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                {user.role.replace('_', ' ')}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Logged in as
                </p>
                <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
              </div>

              <button onClick={() => { setView('DASHBOARD'); setShowProfileMenu(false); }}
                className="menu-btn">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              <button onClick={() => { setView('PROFILE'); setShowProfileMenu(false); }}
                className="menu-btn">
                <UserCircle className="w-4 h-4" /> View Profile
              </button>

              <button onClick={() => { setView('EDIT_PROFILE'); setShowProfileMenu(false); }}
                className="menu-btn">
                <Settings className="w-4 h-4" /> Edit Profile
              </button>

              <div className="h-px bg-slate-100 my-1"></div>

              <button onClick={handleLogout}
                className="menu-btn text-rose-600 hover:bg-rose-50">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ===================== MAIN ===================== */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {view === 'DASHBOARD' ? (
            <>
              {user.role === UserRole.PASSENGER && <PassengerDashboard user={user} />}
              {(user.role === UserRole.ADMIN || user.role === UserRole.ROOT_ADMIN) && <AdminDashboard user={user} />}
              {user.role === UserRole.TC && <TCDashboard user={user} />}
            </>
          ) : (
            <ProfileView
              user={user}
              editMode={view === 'EDIT_PROFILE'}
              onClose={() => setView('DASHBOARD')}
              onUpdate={(updated) => { setUser(updated); setView('PROFILE'); }}
            />
          )}
        </div>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
          © 2026 Sivaramakrishnan B • Station Track Public Access v3.5
        </p>
      </footer>

      {/* Shared Menu Button Style */}
      <style>{`
        .menu-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #475569;
          transition: background 0.2s;
        }
        .menu-btn:hover {
          background: #f8fafc;
          color: #2563eb;
        }
      `}</style>

    </div>
  );
};

export default App;
