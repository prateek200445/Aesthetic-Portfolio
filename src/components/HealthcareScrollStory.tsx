"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
		<section
			ref={sectionRef}
			className="relative left-1/2 h-screen w-screen -translate-x-1/2 overflow-hidden bg-[linear-gradient(145deg,#153037_0%,#0f242c_48%,#132f38_100%)]"
			aria-label="Healthcare transformation story"
		>
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
	);
}
