/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { 
  TrendingUp, 
  ArrowRight, 
  Play, 
  Star, 
  UserCircle, 
  Mail, 
  Music, 
  ChevronRight,
  Instagram,
  Twitter,
  Youtube,
  Search
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Components ---

const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789%&#";

  useEffect(() => {
    if (!isInView) {
      // Initialize with correct length
      setDisplayText(text.split("").map(() => " ").join(""));
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            if (letter === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      // Slightly faster increment for shorter duration, but kept smooth
      iteration += 0.35;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className="inline-block transition-all duration-300">{displayText}</span>;
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5">
    <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
      <div className="text-2xl font-black tracking-tighter text-primary font-headline">SonicCanvas</div>
      <div className="hidden md:flex items-center gap-8 font-bold">
        <a className="text-neutral-600 hover:text-primary transition-colors" href="#">Artistes</a>
        <a className="text-neutral-600 hover:text-primary transition-colors" href="#">Recruteurs</a>
        <a className="text-neutral-600 hover:text-primary transition-colors" href="#">Vitrine</a>
        <a className="text-neutral-600 hover:text-primary transition-colors" href="#">Tarifs</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-6 py-2 text-primary hover:bg-primary/10 rounded-full font-bold transition-all active:scale-95 cursor-pointer">Connexion</button>
        <button className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">Commencer</button>
      </div>
    </div>
  </nav>
);

const FloatingArtistCard = ({ name, genre, image, delay, translateClass, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.8 }}
    className={`bg-white p-3 rounded-xl shadow-lg border border-black/5 group flex items-center gap-4 pr-6 transition-all hover:shadow-xl hover:-translate-x-2 w-full max-w-[320px] ${translateClass}`}
  >
    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/5 shrink-0">
      <img referrerPolicy="no-referrer" alt={name} className="w-full h-full object-cover" src={image} />
    </div>
    <div>
      <h4 className="font-bold text-base leading-tight">{name}</h4>
      <p className="text-xs text-on-surface-variant font-medium">{genre}</p>
    </div>
    <button className={`ml-auto w-8 h-8 rounded-full bg-background flex items-center justify-center ${color} group-hover:bg-primary group-hover:text-white transition-colors`}>
      <Play className="w-4 h-4 fill-current" />
    </button>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, colorClass }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="relative group p-4"
  >
    <div className={`w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="font-headline text-2xl font-bold mb-3">{title}</h3>
    <p className="text-on-surface-variant leading-relaxed">{description}</p>
  </motion.div>
);

const ShowcaseCard = ({ name, genre, rating, image }: any) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="flex-none w-72 snap-start bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5"
  >
    <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-neutral-100">
      <img referrerPolicy="no-referrer" alt={name} className="w-full h-full object-cover artist-card-image" src={image} />
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-on-surface-variant font-medium">{genre}</p>
      </div>
      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded text-primary text-xs font-bold">
        <Star className="w-3 h-3 fill-current" /> {rating}
      </div>
    </div>
  </motion.div>
);

const ArtistGridItem = ({ name, genre, image, description }: any) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="group"
  >
    <div className="aspect-[4/5] rounded-2xl bg-neutral-100 overflow-hidden mb-4 relative cursor-pointer">
      <img 
        referrerPolicy="no-referrer" 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
        src={image} 
      />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
        Nouveau Talent
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="font-bold text-xl">{name}</h4>
      <p className="text-sm text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">{description}</p>
      <button className="text-sm font-bold text-primary flex items-center gap-2 w-fit group/btn">
        Voir le profil 
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [filter, setFilter] = useState("Tout");

  const categories = ["Tout", "Rock", "Electro", "Jazz", "Hip-Hop"];

  const artists = [
    {
      name: "D-Flow",
      genre: "Hip-Hop / LoFi",
      category: "Hip-Hop",
      image: "https://picsum.photos/seed/dflow/800/1000",
      description: "Le renouveau du Hip-Hop parisien aux influences Lo-Fi et Jazz."
    },
    {
      name: "Static Sparks",
      genre: "Rock Moderne",
      category: "Rock",
      image: "https://picsum.photos/seed/sparks/800/1000",
      description: "Une énergie brute et des riffs saturés pour vos plus grands festivals."
    },
    {
      name: "Neon Weaver",
      genre: "Techno Ambiante",
      category: "Electro",
      image: "https://picsum.photos/seed/neon/800/1000",
      description: "Architecte sonore spécialisé dans l'ambient techno et le synthwave."
    },
    {
      name: "Elara Sol",
      genre: "Soul / Pop",
      category: "Jazz",
      image: "https://picsum.photos/seed/elara/800/1000",
      description: "Une voix d'or qui sublime chaque mélodie entre soul et pop moderne."
    }
  ];

  const filteredArtists = filter === "Tout" ? artists : artists.filter(a => a.category === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] mesh-gradient-glow -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-[30%] left-0 w-[800px] h-[800px] mesh-gradient-glow -z-10 -translate-x-1/2"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 pt-40 pb-20 md:pt-56 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 xl:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-on-surface mb-8">
                  Le futur de la scène <span className="text-primary italic whitespace-nowrap"><ScrambleText text="indépendante" /></span> commence ici
                </h1>
                <p className="text-xl md:text-2xl text-on-surface-variant max-w-xl mb-10 leading-relaxed font-medium">
                  Connectez-vous directement avec les meilleurs talents musicaux ou trouvez votre prochaine scène internationale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-primary text-white rounded-full text-lg font-bold flex items-center gap-2 hover:scale-105 shadow-xl shadow-primary/20 transition-all active:scale-95 cursor-pointer">
                    Explorer les Talents
                    <TrendingUp className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 bg-white text-on-surface border border-black/5 rounded-full text-lg font-bold hover:bg-neutral-50 transition-all active:scale-95 cursor-pointer">
                    Postuler comme Artiste
                  </button>
                </div>
                
                <div className="mt-20 flex gap-16 border-l-2 border-primary/10 pl-8">
                  <div>
                    <div className="font-headline text-4xl font-black text-primary">
                      <Counter value={5000} />+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">Artistes</div>
                  </div>
                  <div>
                    <div className="font-headline text-4xl font-black text-secondary">
                      <Counter value={2000} />+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">Évènements</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="hidden xl:flex xl:col-span-5 flex-col gap-4 items-end relative">
              <FloatingArtistCard 
                name="Luna Echo" genre="Indie Alternatif" color="text-primary" delay={0.2} translateClass="" 
                image="https://picsum.photos/seed/luna/200/200"
              />
              <FloatingArtistCard 
                name="Vortex Beats" genre="Électronique" color="text-secondary" delay={0.4} translateClass="translate-x-8" 
                image="https://picsum.photos/seed/vortex/200/200"
              />
              <FloatingArtistCard 
                name="Sera Noir" genre="Jazz Moderne" color="text-primary" delay={0.6} translateClass="translate-x-4" 
                image="https://picsum.photos/seed/sera/200/200"
              />
              <FloatingArtistCard 
                name="D-Flow" genre="Hip-Hop / LoFi" color="text-primary" delay={0.8} translateClass="translate-x-12" 
                image="https://picsum.photos/seed/dflow2/200/200"
              />
            </div>
          </div>
        </section>

        {/* Featured Showcase */}
        <section className="py-24 bg-neutral-100/50 border-y border-black/5">
          <div className="max-w-7xl mx-auto px-8 mb-12 flex justify-between items-end">
            <div>
              <h2 className="font-headline text-4xl font-black tracking-tight">Talents à l'affiche</h2>
              <p className="text-on-surface-variant font-medium mt-1">Découvrez les profils les plus réservés du mois</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-1 hover:gap-3 transition-all group">
              Voir tout <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 px-8 snap-x no-scrollbar max-w-7xl mx-auto">
            <ShowcaseCard name="Vortex Beats" genre="Techno / House" rating="4.9" image="https://picsum.photos/seed/vortex/800/800" />
            <ShowcaseCard name="Seraphina Noir" genre="Jazz Moderne" rating="5.0" image="https://picsum.photos/seed/sera/800/800" />
            <ShowcaseCard name="The Blue Shift" genre="Rock Indépendant" rating="4.7" image="https://picsum.photos/seed/blue/800/800" />
            <ShowcaseCard name="Marcus Field" genre="Folk / Acoustique" rating="4.8" image="https://picsum.photos/seed/marcus/800/800" />
            <ShowcaseCard name="Luna Echo" genre="Indie Alternatif" rating="4.9" image="https://picsum.photos/seed/luna/800/800" />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl font-black tracking-tight mb-4">Comment ça marche</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto font-medium">Trois étapes simples pour transformer votre talent en opportunités professionnelles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 relative">
            <FeatureCard 
              icon={UserCircle} 
              title="Créez votre profil" 
              description="Mettez en avant votre univers, vos vidéos et vos meilleurs morceaux en quelques clics."
              colorClass="bg-primary/10 text-primary"
            />
            <FeatureCard 
              icon={Mail} 
              title="Recevez des offres" 
              description="Soyez contacté directement par des organisateurs d'évènements du monde entier."
              colorClass="bg-secondary/10 text-secondary"
            />
            <FeatureCard 
              icon={Music} 
              title="Jouez sur scène" 
              description="Finalisez les contrats en toute sécurité et montez sur scène pour faire vibrer le public."
              colorClass="bg-primary/10 text-primary"
            />
          </div>
        </section>

        {/* Filterable Grid */}
        <section className="py-32 bg-white rounded-t-[3rem] shadow-2xl relative z-10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
              <div className="max-w-xl">
                <h2 className="font-headline text-5xl font-black tracking-tight mb-4">Trouvez l'artiste idéal</h2>
                <div className="flex items-center gap-3 py-2 px-4 bg-background rounded-full border border-black/5 w-fit">
                  <Search className="w-4 h-4 text-on-surface-variant" />
                  <input type="text" placeholder="Rechercher un instrument, un genre..." className="bg-transparent border-none focus:ring-0 text-sm w-48" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-3 rounded-full font-bold transition-all cursor-pointer ${
                      filter === cat 
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                        : "bg-background text-on-surface-variant hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {filteredArtists.map((artist, i) => (
                <ArtistGridItem key={artist.name} {...artist} />
              ))}
              {filteredArtists.length === 0 && (
                <div className="col-span-full py-20 text-center text-on-surface-variant font-bold text-xl">
                  Aucun artiste trouvé dans cette catégorie.
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-8 py-32">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-neutral-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[100px] -z-0"></div>
            
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="inline-flex items-center bg-white/5 border border-white/10 p-1 rounded-full mb-12 backdrop-blur-md">
                <button className="px-8 py-2.5 rounded-full bg-white text-neutral-900 font-black text-sm transition-all shadow-lg active:scale-95">Je suis un Artiste</button>
                <button className="px-8 py-2.5 rounded-full text-white/60 font-black text-sm hover:text-white transition-all">Je suis un Recruteur</button>
              </div>
              
              <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                Prêt à faire <span className="text-primary-fixed">vibrer</span> le monde ?
              </h2>
              <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium">
                Rejoignez une communauté de plus de 5000 professionnels de la musique. Créez votre profil en moins de 2 minutes et commencez à recevoir des opportunités.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-12 py-5 bg-primary text-white rounded-full text-xl font-black shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                  Créer mon profil
                </button>
                <button className="px-12 py-5 bg-white/5 text-white border border-white/10 backdrop-blur-md rounded-full text-xl font-black hover:bg-white/10 active:scale-95 transition-all cursor-pointer">
                  En savoir plus
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-neutral-50 py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="text-3xl font-black tracking-tighter text-primary font-headline mb-6">SonicCanvas</div>
              <p className="text-on-surface-variant font-medium leading-relaxed max-w-xs">
                La plateforme ultime pour les talents indépendants et les programmateurs visionnaires qui souhaitent réinventer l'industrie musicale.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <h5 className="font-black mb-6 uppercase text-xs tracking-[0.2em] text-neutral-400">Plateforme</h5>
              <ul className="space-y-4 font-bold text-sm">
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Conditions</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Confidentialité</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">FAQ Artiste</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h5 className="font-black mb-6 uppercase text-xs tracking-[0.2em] text-neutral-400">Communauté</h5>
              <ul className="space-y-4 font-bold text-sm">
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Blog Musique</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Témoignages</a></li>
                <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Aide & Support</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
              <div className="flex gap-4 mb-8">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-primary transition-all hover:text-white shadow-sm" href="#">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="text-neutral-400 font-bold text-sm mb-2">© 2024 SonicCanvas. Curating the digital stage.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
