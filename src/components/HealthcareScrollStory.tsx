"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Baloo_2, Nunito } from "next/font/google";

const baloo = Baloo_2({
	subsets: ["latin"],
	weight: ["700", "800"],
});

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["500", "700"],
});

export default function HealthcareScrollStory() {
	const sectionRef = useRef<HTMLElement | null>(null);

	// Refs for Pharmacist Section
	const pharmacistSectionRef = useRef<HTMLElement | null>(null);
	const pharmacistVideoWrapRef = useRef<HTMLDivElement | null>(null);
	const pharmacistVideoRef = useRef<HTMLVideoElement | null>(null);
	const pharmacistOverlayRef = useRef<HTMLDivElement | null>(null);
	const pharmacistText1Ref = useRef<HTMLParagraphElement | null>(null);
	const pharmacistText2Ref = useRef<HTMLHeadingElement | null>(null);

	// Refs for Tablets Section
	const tabletsSectionRef = useRef<HTMLElement | null>(null);
	const tabletsVideoWrapRef = useRef<HTMLDivElement | null>(null);
	const tabletsText1Ref = useRef<HTMLHeadingElement | null>(null);
	const tabletsText2Ref = useRef<HTMLParagraphElement | null>(null);

	// Refs for Organise Docs Section
	const organiseSectionRef = useRef<HTMLElement | null>(null);
	const organiseVideoWrapRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (typeof window !== "undefined") {
			gsap.registerPlugin(ScrollTrigger);
		}

		let pTl: gsap.core.Timeline | undefined;
		let tTl: gsap.core.Timeline | undefined;

		const pSection = pharmacistSectionRef.current;
		const pVideoWrap = pharmacistVideoWrapRef.current;
		const pVideo = pharmacistVideoRef.current;
		const pOverlay = pharmacistOverlayRef.current;
		const pText1 = pharmacistText1Ref.current;
		const pText2 = pharmacistText2Ref.current;

		gsap.set(pVideoWrap, {
			clipPath: "inset(12% 8% 12% 8% round 24px)",
			scale: 0.88,
			opacity: 0,
			y: 60,
		});
		gsap.set(pVideo, {
			scale: 1.5,
			filter: "brightness(0.6) saturate(0.6)",
		});
		gsap.set([pText1, pText2], {
			opacity: 0,
			y: 48,
			skewY: 4,
		});
		gsap.set(pOverlay, { opacity: 0 });

		if (pSection) {
			pTl = gsap.timeline({
				scrollTrigger: {
					trigger: pSection,
					start: "top bottom-=10%",
					end: "center center",
					scrub: 1.4,
					invalidateOnRefresh: true,
				},
			});

			pTl.to(
				pVideoWrap,
				{
					clipPath: "inset(0% 0% 0% 0% round 0px)",
					scale: 1,
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
				},
				0
			)
			.to(
				pVideo,
				{
					scale: 1.35,
					filter: "brightness(0.85) saturate(1.05)",
					duration: 1,
					ease: "power1.out",
				},
				0
			)
			.to(
				pOverlay,
				{
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
				},
				0.2
			)
			.to(
				pText1,
				{
					opacity: 1,
					y: 0,
					skewY: 0,
					duration: 0.75,
					ease: "power3.out",
				},
				0.5
			)
			.to(
				pText2,
				{
					opacity: 1,
					y: 0,
					skewY: 0,
					duration: 0.75,
					ease: "power3.out",
				},
				0.65
			);
		}

		// ----------------------------------------------------
		// Tablets Section Animations
		// ----------------------------------------------------
		const tSection = tabletsSectionRef.current;
		const tVideoWrap = tabletsVideoWrapRef.current;
		const tText1 = tabletsText1Ref.current;
		const tText2 = tabletsText2Ref.current;

		if (tSection) {
			gsap.set(tVideoWrap, {
				y: 100,
				opacity: 0,
				scale: 0.95,
			});
			gsap.set([tText1, tText2], {
				y: 40,
				opacity: 0,
			});

			tTl = gsap.timeline({
				scrollTrigger: {
					trigger: tSection,
					start: "top bottom-=20%",
					end: "center center",
					toggleActions: "play none none reverse",
				},
			});

			tTl.to(tVideoWrap, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power3.out",
			})
			.to(tText1, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
			}, 0.3)
			.to(tText2, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power2.out",
			}, 0.5);
		}

		// ----------------------------------------------------
		// Organise Docs Section Animations
		// ----------------------------------------------------
		let oTl: gsap.core.Timeline | undefined;
		const oSection = organiseSectionRef.current;
		const oVideoWrap = organiseVideoWrapRef.current;

		if (oSection && oVideoWrap) {
			gsap.set(oVideoWrap, { opacity: 0, scale: 0.8, rotateX: 5 });
			
			oTl = gsap.timeline({
				scrollTrigger: {
					trigger: oSection,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});

			oTl.to(oVideoWrap, { opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power2.out" })
			   .to(oVideoWrap, { opacity: 1, scale: 1, rotateX: 0, duration: 1.5 }) // Hold
			   .to(oVideoWrap, { opacity: 0, scale: 0.9, rotateX: -5, duration: 1, ease: "power2.in" });
		}

		return () => {
			if (pTl) {
				pTl.scrollTrigger?.kill();
				pTl.kill();
			}
			if (tTl) {
				tTl.scrollTrigger?.kill();
				tTl.kill();
			}
			if (oTl) {
				oTl.scrollTrigger?.kill();
				oTl.kill();
			}
		};
	}, []);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const title1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.26, 0.34], [0, 1, 1, 0]);
	const title2Opacity = useTransform(scrollYProgress, [0.33, 0.42, 0.62, 0.7], [0, 1, 1, 0]);
	const title3Opacity = useTransform(scrollYProgress, [0.66, 0.76, 0.98, 1], [0, 1, 1, 0]);

	const title1Y = useTransform(scrollYProgress, [0, 0.34], [30, -18]);
	const title2Y = useTransform(scrollYProgress, [0.33, 0.7], [30, -18]);
	const title3Y = useTransform(scrollYProgress, [0.66, 1], [30, -18]);

	const cloudDriftLeft = useTransform(scrollYProgress, [0, 1], [0, -80]);
	const cloudDriftRight = useTransform(scrollYProgress, [0, 1], [0, 80]);
	const doctorY = useTransform(scrollYProgress, [0, 1], [22, -18]);
	const doctorRotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
	const doctorOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.92, 0.92, 0]);
	const phoneY = useTransform(scrollYProgress, [0, 1], [-18, 22]);
	const phoneRotate = useTransform(scrollYProgress, [0, 1], [5, -2]);
	const phoneOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 0.96, 0.96, 0]);

	return (
		<>
			<section
				ref={sectionRef}
			className="relative left-1/2 h-screen w-screen -translate-x-1/2 overflow-hidden bg-[linear-gradient(145deg,#153037_0%,#0f242c_48%,#132f38_100%)]"
			aria-label="Healthcare transformation story"
		>
			{/* New asymmetrical fluid S-curve transitioning from TabcuraScrollVisual */}
			<div className="absolute top-[-1px] left-0 w-full leading-none z-10 pointer-events-none rotate-180">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[120px] lg:h-[160px]" preserveAspectRatio="none">
					<path fill="#0b0f13" d="M0,256 C 480,0, 960,320, 1440,128 L1440,320 L0,320 Z"></path>
				</svg>
			</div>

			<div className="relative h-full">
				<div className="relative h-full overflow-hidden">
					<motion.div
						style={{ y: doctorY, rotate: doctorRotate, opacity: doctorOpacity }}
						className="pointer-events-none absolute left-[3.5vw] top-[18vh] z-20 hidden md:block"
					>
						<div className="absolute -inset-5 -z-10 rounded-[34px] bg-[radial-gradient(circle,rgba(109,255,228,0.26)_0%,rgba(109,255,228,0)_70%)] blur-xl" />
						<img
							src="/projects/ai-doctor.png"
							alt="AI doctor assistant"
							className="h-auto w-[clamp(240px,28vw,420px)] rounded-[26px] border border-[#8ef6df]/35 shadow-[0_28px_65px_rgba(0,0,0,0.38)]"
						/>
					</motion.div>

					<motion.div
						style={{ y: phoneY, rotate: phoneRotate, opacity: phoneOpacity }}
						className="pointer-events-none absolute right-[2.5vw] top-1/2 z-20 hidden -translate-y-1/2 md:block"
					>
						<div className="absolute -inset-6 -z-10 rounded-[34px] bg-[radial-gradient(circle,rgba(109,255,228,0.26)_0%,rgba(109,255,228,0)_70%)] blur-xl" />
						<div className="rounded-[26px] border border-[#8ef6df]/35 bg-[#0b232a]/20 p-4 shadow-[0_28px_65px_rgba(0,0,0,0.38)] backdrop-blur-[1.5px]">
							<img
								src="/projects/tabcura-phone.png"
								alt="Digital prescription phone preview"
								className="h-auto w-[clamp(260px,27vw,420px)] drop-shadow-[0_24px_55px_rgba(0,0,0,0.4)]"
							/>
						</div>
					</motion.div>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(11,123,109,0.34),transparent_44%),radial-gradient(circle_at_80%_75%,rgba(47,191,167,0.24),transparent_40%)]" />

					<motion.div
						style={{ x: cloudDriftLeft }}
						className="pointer-events-none absolute left-[-6vw] top-[14vh] h-24 w-64 rounded-[999px] bg-[#9cebd6]/20 blur-[0.5px]"
					/>
					<motion.div
						style={{ x: cloudDriftRight }}
						className="pointer-events-none absolute right-[-8vw] top-[42vh] h-20 w-56 rounded-[999px] bg-[#9cebd6]/20 blur-[0.5px]"
					/>
					<motion.div
						style={{ x: cloudDriftLeft }}
						className="pointer-events-none absolute bottom-[12vh] left-[12vw] h-16 w-44 rounded-[999px] bg-[#9cebd6]/16"
					/>

					<div className="absolute inset-0 px-6 pt-12 md:px-10 lg:px-14">
						<p
							className={`${nunito.className} text-sm uppercase tracking-[0.25em] text-[#b7fff1]/85 md:text-base`}
						>
							Next step in care
						</p>
					</div>

					<div className="absolute inset-0 flex items-center justify-center px-6 md:px-10">
						<div className="pointer-events-none absolute h-104 w-104 rounded-full bg-[radial-gradient(circle,rgba(67,227,196,0.42),rgba(14,42,51,0)_66%)] blur-2xl" />

						<motion.div style={{ opacity: title1Opacity, y: title1Y }} className="absolute text-center">
							<h2
								className={`${baloo.className} text-[clamp(3.1rem,11vw,10rem)] uppercase leading-[0.9] tracking-[0.01em] text-[#8ef6df]`}
							>
								Health Data
								<br />
								Gets Organized
							</h2>
							<p className={`${nunito.className} mt-5 text-lg text-[#e7fff8] md:text-2xl`}>
								Prescriptions, reports, and timelines in one clean flow.
							</p>
						</motion.div>

						<motion.div style={{ opacity: title2Opacity, y: title2Y }} className="absolute text-center">
							<h2
								className={`${baloo.className} text-[clamp(3.1rem,11vw,10rem)] uppercase leading-[0.9] tracking-[0.01em] text-[#8ef6df]`}
							>
								Doctor Notes
								<br />
								Become Action
							</h2>
							<p className={`${nunito.className} mt-5 text-lg text-[#e7fff8] md:text-2xl`}>
								AI extracts medicine details and turns chaos into routines.
							</p>
						</motion.div>

						<motion.div style={{ opacity: title3Opacity, y: title3Y }} className="absolute text-center">
							<h2
								className={`${baloo.className} text-[clamp(3.1rem,11vw,10rem)] uppercase leading-[0.9] tracking-[0.01em] text-[#8ef6df]`}
							>
								Better Habits.
								<br />
								Better Health.
							</h2>
							<p className={`${nunito.className} mt-5 text-lg text-[#e7fff8] md:text-2xl`}>
								Personalized care nudges for everyday recovery.
							</p>
						</motion.div>
					</div>

					<div className="pointer-events-none absolute bottom-7 left-0 right-0 px-6 md:px-10">
						<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 md:gap-4">
							{["Prescription OCR", "Medicine Timeline", "Diet Suggestions", "1-Tap Ordering"].map((chip) => (
								<span
									key={chip}
									className={`${nunito.className} rounded-full border border-[#8ef6df]/45 bg-[#0a2229]/75 px-4 py-2 text-sm font-semibold tracking-[0.04em] text-[#d7fff6] md:text-base`}
								>
									{chip}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>

		{/* ══════════════════════════════════════════════════════
				SECTION 2 — Pharmacist Cinematic Video
				══════════════════════════════════════════════════════ */}
		<section
			ref={pharmacistSectionRef}
			className="relative left-1/2 w-screen -translate-x-1/2 h-[250vh] bg-[#132f38] z-20"
		>
			{/* Symmetrical dip boundary mirroring Wholesale Marketplace */}
			<div className="absolute top-[-1px] left-0 w-full leading-none z-30 pointer-events-none rotate-180">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
					<path fill="#132f38" d="M0,320 L0,160 C 480,320 960,320 1440,160 L1440,320 Z"></path>
				</svg>
			</div>

			<div className="sticky top-0 h-screen w-full overflow-hidden bg-[#132f38]">
				<div
					ref={pharmacistVideoWrapRef}
					className="absolute inset-0 h-full w-full overflow-hidden"
					style={{ willChange: "transform, clip-path, opacity" }}
				>
					<video
						ref={pharmacistVideoRef}
						src="/projects/pharmacist%20tabcura.mp4"
						className="absolute inset-0 h-full w-full object-cover"
						loop
						playsInline
						preload="auto"
						autoPlay
						muted
					/>
					{/* Overlay Gradient to make text readable */}
					<div
						ref={pharmacistOverlayRef}
						className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#010304]/90 via-[#010304]/50 to-transparent"
					/>
				</div>

				{/* Text floating on the left */}
				<div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pointer-events-none">
					<div className="max-w-3xl">
						<p
							ref={pharmacistText1Ref}
							className="mb-4 text-[clamp(0.8rem,1.2vw,1rem)] font-bold tracking-[0.3em] text-[#8ef6df] uppercase drop-shadow-md"
							style={{ fontFamily: "var(--font-geist-sans)" }}
						>
							24/7 AI Assistance
						</p>
						<h2
							ref={pharmacistText2Ref}
							className="text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.95] text-white uppercase tracking-tight drop-shadow-2xl"
							style={{ fontFamily: "var(--font-bebas)", textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
						>
							Get your personalised pharmacist on your phone
						</h2>
					</div>
				</div>
			</div>

			{/* Wavy curve transitioning to Tablets section (bg is #ffffff) */}
			<div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
					<path fill="#ffffff" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>
		</section>

		{/* ══════════════════════════════════════════════════════
				SECTION 3 — Tablets Portrait Video & Text
				══════════════════════════════════════════════════════ */}
		<section
			ref={tabletsSectionRef}
			className="relative w-screen left-1/2 -translate-x-1/2 bg-[#ffffff] py-20 md:py-32 overflow-hidden"
		>
			<div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
					{/* Portrait Video Column */}
					<div className="relative mx-auto w-full max-w-[420px] lg:max-w-[540px] lg:mx-0">
						<div
							ref={tabletsVideoWrapRef}
							className="relative aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-black/5"
							style={{ willChange: "transform, opacity" }}
						>
							<video
								src="/projects/tablets.mp4"
								className="absolute inset-0 h-full w-full object-cover"
								loop
								playsInline
								preload="auto"
								autoPlay
								muted
							/>
						</div>
					</div>

					{/* Text Content Column */}
					<div className="flex flex-col justify-center text-center lg:text-left">
						<h2
							ref={tabletsText1Ref}
							className="mb-6 text-[clamp(4rem,7vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-[#050505] uppercase"
							style={{ fontFamily: "var(--font-bebas)" }}
						>
							Know your medicines and take it on time
						</h2>
						<p
							ref={tabletsText2Ref}
							className="text-[clamp(1.5rem,2.5vw,2.5rem)] text-[#050505]/60 font-medium tracking-wide"
							style={{ fontFamily: "var(--font-geist-sans)" }}
						>
							via alarming system for adult persons
						</p>
					</div>
				</div>
			</div>

			{/* Wavy curve transitioning to Organise Docs section */}
			<div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
					<path fill="#f4f4f5" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>
		</section>

		{/* ══════════════════════════════════════════════════════
				SECTION 4 — Organise Docs Video
				══════════════════════════════════════════════════════ */}
		<section
			ref={organiseSectionRef}
			className="relative w-screen left-1/2 -translate-x-1/2 bg-[#f4f4f5] pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden"
		>
			<div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-24">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
					{/* Text Column */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
						<h2 className="text-[clamp(3.5rem,6vw,6rem)] font-bold leading-[0.9] text-[#1f2937] uppercase tracking-tight" style={{ fontFamily: "var(--font-bebas)" }}>
							Organise your medical reports
						</h2>
						<p className="mt-6 text-[clamp(1.2rem,1.8vw,1.8rem)] text-[#4b5563] leading-[1.4]" style={{ fontFamily: "var(--font-geist-sans)" }}>
							Via multi layer architecture (via doctor, hospital and via disease)
						</p>
					</div>

					{/* Video Column */}
					<div className="w-full lg:w-1/2 flex justify-center perspective-[1000px] order-1 lg:order-2 mt-8 lg:mt-0">
						<div
							ref={organiseVideoWrapRef}
							className="relative w-full max-w-[600px] aspect-[16/10] lg:aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-black/5"
							style={{ willChange: "transform, opacity" }}
						>
							<video
								src="/projects/organise_docs.mp4"
								className="absolute inset-0 w-full h-full object-cover"
								loop
								playsInline
								preload="auto"
								autoPlay
								muted
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Wavy curve transitioning to Section 5 / Project Highlights (#ece9e9) */}
			<div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
					<path fill="#f9fafb" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>
		</section>

		{/* ══════════════════════════════════════════════════════
				SECTION 5 — YouTube Demo
				══════════════════════════════════════════════════════ */}
		<section className="relative w-screen left-1/2 -translate-x-1/2 bg-[#f9fafb] pt-16 pb-12 md:pt-20 md:pb-16 flex flex-col items-center justify-center">
			<h2 
				className="mb-12 text-[clamp(2rem,4vw,3.5rem)] text-[#1a1a1a] text-center max-w-2xl px-6" 
				style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.15 }}
			>
				Find the demo video of the product here
			</h2>
			
			<a 
				href="https://youtu.be/dGp_KWmsbDE" 
				target="_blank" 
				rel="noopener noreferrer"
				className="group relative cursor-pointer mb-10 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
			>
				{/* YouTube Logo SVG */}
				<svg viewBox="0 0 120 84" width="200" height="140" className="transition-transform duration-500">
					{/* Red background rounded rect */}
					<rect 
						x="0" y="0" width="120" height="84" rx="18" 
						fill="#FF0000" 
						className="drop-shadow-md transition-all duration-500 group-hover:drop-shadow-2xl" 
					/>
					{/* White play triangle */}
					<polygon 
						points="46,26 80,42 46,58" 
						fill="white" 
						className="transition-all duration-500 origin-[63px_42px] group-hover:scale-[1.25] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]" 
					/>
				</svg>
			</a>

			<a 
				href="https://youtu.be/dGp_KWmsbDE" 
				target="_blank" 
				rel="noopener noreferrer" 
				className="rounded-full bg-[#1a1a1a] text-white px-8 py-3 uppercase tracking-[0.1em] text-[10px] font-bold transition-all hover:bg-[#FF0000] hover:text-white hover:scale-105 duration-300 shadow-md hover:shadow-xl mb-12" 
				style={{ fontFamily: "var(--font-geist-sans)" }}
			>
				Watch Demo
			</a>

			{/* Bottom curve transitioning back to page background (#ece9e9) */}
			<div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
					<path fill="#ece9e9" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>
		</section>
		</>
	);
}
