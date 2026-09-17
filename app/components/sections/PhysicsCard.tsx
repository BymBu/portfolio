"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ThreeElements,
} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";

// РЕГИСТРАЦИЯ КАСТОМНЫХ ЭЛЕМЕНТОВ ДЛЯ TSX
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElements["group"];
    meshLineMaterial: ThreeElements["group"] & {
      map?: THREE.Texture;
      repeat?: [number, number];
      color?: string | number;
      resolution?: [number, number];
      useMap?: boolean;
      lineWidth?: number;
      depthTest?: boolean;
    };
  }
}

extend({ MeshLineGeometry, MeshLineMaterial });

// ТИПЫ ДЛЯ ФИЗИКИ
interface SegmentProps extends Omit<RigidBodyProps, "type"> {
  type: "dynamic" | "fixed" | "kinematicPosition" | "kinematicVelocity";
}

const segmentProps: SegmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
};

// КОМПОНЕНТ ЧАШКИ
const CupSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 2.45597C17.7415 2.59747 18.1811 2.75299 18.5609 3.22083C19.0367 3.80673 19.0115 4.43998 18.9612 5.70647C18.7805 10.2595 17.7601 16 12.0002 16C6.24021 16 5.21983 10.2595 5.03907 5.70647C4.98879 4.43998 4.96365 3.80673 5.43937 3.22083C5.91508 2.63494 6.48445 2.53887 7.62318 2.34674C8.74724 2.15709 10.2166 2 12.0002 2C12.7184 2 13.3857 2.02548 14 2.06829"
      stroke="#ffffff"
    />
    <path
      d="M19 5L19.9486 5.31621C20.9387 5.64623 21.4337 5.81124 21.7168 6.20408C22 6.59692 22 7.11873 21.9999 8.16234L21.9999 8.23487C21.9999 9.09561 21.9999 9.52598 21.7927 9.87809C21.5855 10.2302 21.2093 10.4392 20.4569 10.8572L17.5 12.5"
      stroke="#ffffff"
    />
    <path
      d="M4.99994 5L4.05132 5.31621C3.06126 5.64623 2.56623 5.81124 2.2831 6.20408C1.99996 6.59692 1.99997 7.11873 2 8.16234L2 8.23487C2.00003 9.09561 2.00004 9.52598 2.20723 9.87809C2.41441 10.2302 2.79063 10.4392 3.54305 10.8572L6.49994 12.5"
      stroke="#ffffff"
    />
    <path d="M12 17V19" stroke="#ffffff" strokeLinecap="round" />
    <path
      d="M15.5 22H8.5L8.83922 20.3039C8.93271 19.8365 9.34312 19.5 9.8198 19.5H14.1802C14.6569 19.5 15.0673 19.8365 15.1608 20.3039L15.5 22Z"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M18 22H6" stroke="#ffffff" strokeLinecap="round" />
  </svg>
);

// ИСПРАВЛЕННЫЕ ВАРИАНТЫ АНИМАЦИИ С ЯВНЫМИ ТИПАМИ
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20,
    },
  },
};

const tagVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function PhysicsCard() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ["start end", "end start"],
  });

  const yTrees = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yCanvas = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacityCanvas = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={canvasRef}
      className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-[var(--bg-color)]"
    >
      {/* ФОН */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/me2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
      </div>

      {/* ДЕРЕВЬЯ */}
      <motion.div
        className="absolute top-[-10%] bottom-[-10%] pointer-events-none z-0 opacity-30 overflow-hidden"
        style={{ left: "-190px", width: "900px", y: yTrees }}
      >
        <Image
          src="/tree-left.png"
          alt=""
          fill
          className="object-cover object-top grayscale contrast-155 brightness-20 scale-x-[0.7] -rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/40 to-[var(--bg-color)]" />
      </motion.div>

      <motion.div
        className="absolute right-[-230px] top-[-10%] bottom-[-10%] scale-x-[1.1] w-[1500px] rotate-3 pointer-events-none z-0 opacity-30"
        style={{ y: yTrees }}
      >
        <Image
          src="/tree-right.png"
          alt=""
          fill
          className="object-cover object-top grayscale contrast-155 brightness-20"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/30 to-[var(--bg-color)]" />
      </motion.div>

      {/* 3D СЦЕНА */}
      <motion.div
        style={{ y: yCanvas, opacity: opacityCanvas }}
        className="absolute inset-0 z-10 pointer-events-auto"
      >
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={Math.PI * 0.8} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
        </Canvas>
      </motion.div>

      {/* КОНТЕНТ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 pointer-events-auto"
        >
          {/* ЗАГОЛОВОК ВЯЧЕСЛАВ ЕРОФЕЕВ */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
            <h1
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-[12vw] md:text-[10vw] font-[700] leading-[0.85] text-white/20 select-none whitespace-nowrap"
            >
              {["В", "Я", "Ч", "Е", "С", "Л", "А", "В"].map((char, i) => (
                <motion.span
                  key={`v-${i}`}
                  className="inline-block"
                  animate={getLetterAnimation(i)}
                  transition={{
                    repeat: Infinity,
                    repeatType: i % 2 === 0 ? "mirror" : "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <h2
              style={{ fontFamily: "'Clash Display', sans-serif" }}
              className="text-[10vw] md:text-[8vw] font-[700] leading-[0.85] text-white/15 mt-[-2vw] select-none whitespace-nowrap pl-[5vw]"
            >
              {["Е", "Р", "О", "Ф", "Е", "Е", "В"].map((char, i) => (
                <motion.span
                  key={`e-${i}`}
                  className="inline-block"
                  animate={getLetterAnimation(i + 8)}
                  transition={{
                    repeat: Infinity,
                    repeatType: i % 2 === 0 ? "mirror" : "reverse",
                    ease: "easeInOut",
                    delay: 0.15 + i * 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-[var(--accent-color)] font-mono text-sm tracking-widest uppercase">
              Portfolio 2026
            </p>
            <p className="text-xl text-gray-400 font-light max-w-md mt-4">
              18 лет. Fullstack разработчик из Бурятии. Превращаю хаос в сложные
              системы и побеждаю в чемпионатах.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {[
              "Next.js 16",
              "React",
              "Vue 3",
              "Laravel",
              "NestJS",
              "Strapi",
              "Three.js",
              "Docker",
              "PostgreSQL",
            ].map((tech) => (
              <motion.span
                key={tech}
                variants={tagVariants}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300 hover:bg-white/10 hover:border-white/30 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-to-br from-white/5 to-transparent border-l-2 border-[var(--accent-color)] backdrop-blur-sm rounded-r-lg"
          >
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full animate-pulse" />{" "}
              ДОСТИЖЕНИЯ
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 flex-col mt-5">
              <li className="flex gap-4 items-center">
                <CupSvg /> 1 место «Профессионалы 2026»
              </li>
              <li className="flex gap-4 items-center">
                <CupSvg /> 1 место «Мы — будущее IT Бурятии III»
              </li>
              <li className="flex gap-4 items-center">
                <CupSvg /> 1 место Открытый конкурс БИИК СибГути
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 pt-4">
            {[
              { name: "Telegram", url: "https://t.me/slepta" },
              { name: "VKontakte", url: "https://vk.com/bymbu" },
              { name: "GitHub", url: "https://github.com/BymBu" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm font-mono flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-white rounded-full group-hover:bg-[var(--accent-color)] transition-colors" />{" "}
                {social.name}
              </a>
            ))}
          </motion.div>
        </motion.div>
        <div className="hidden lg:block h-[600px] pointer-events-none" />
      </div>
    </div>
  );
}

// ХЕЛПЕР ДЛЯ АНИМАЦИЙ БУКВ
function getLetterAnimation(index: number) {
  const animations = [
    { x: [0, -2, 2, -1, 0], opacity: [1, 0.8, 1, 0.9, 1] },
    { y: [0, 10, -2, 0], skewX: [0, 2, -1, 0], rotate: [0, 1, -1, 0.5, 0] },
    { x: [0, 4, 0, -2, 0], opacity: [1, 0.6, 1, 0.8, 1] },
    { y: [0, 10, -2, 0], filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] },
    { x: [0, -3, 2, 0], y: [0, 2, -1, 0], opacity: [1, 0.7, 1, 0.9, 1] },
    { y: [0, 8, -1, 0], x: [0, 2, 0, -1, 0] },
    { x: [0, -2, 3, 0], opacity: [1, 0.8, 1, 0.7, 1] },
    { y: [0, 12, -3, 0], skewX: [0, -2, 1, 0] },
  ];
  return animations[index % animations.length];
}

// КОМПОНЕНТ ЛЕНТЫ С БЕЙДЖЕМ
function Band({
  maxSpeed = 50,
  minSpeed = 10,
}: {
  maxSpeed?: number;
  minSpeed?: number;
}) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const texture = useTexture("/badge.png");
  const ropeTexture = useTexture("/rope.png");
  ropeTexture.wrapS = ropeTexture.wrapT = THREE.RepeatWrapping;

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 0.31, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current) {
        (band.current.geometry as any).setPoints(curve.getPoints(32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    drag(
      new THREE.Vector3()
        .copy(e.point)
        .sub(vec.copy(card.current?.translation())),
    );
  };

  const handlePointerUp = (e: any) => {
    e.target.releasePointerCapture(e.pointerId);
    drag(false);
  };

  return (
    <>
      <RigidBody
        position={[3, 4, 0]}
        ref={fixed}
        {...segmentProps}
        type="fixed"
      />
      <RigidBody position={[3.5, 7, 0]} ref={j1} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[4, 7, 0]} ref={j2} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[4.5, 7, 0]} ref={j3} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>

      <RigidBody
        position={[5, 7, 0]}
        ref={card}
        {...segmentProps}
        type={dragged ? "kinematicPosition" : "dynamic"}
      >
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <group
          scale={2.25}
          position={[0, -1.2, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={handlePointerUp}
          onPointerDown={handlePointerDown}
        >
          <mesh>
            <planeGeometry args={[0.8, 1.13]} />
            <meshPhysicalMaterial
              map={texture}
              clearcoat={1}
              clearcoatRoughness={0.15}
              roughness={0.3}
              metalness={0.1}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0.6, 0.01]}>
            <boxGeometry args={[0.5, 0.12, 0.06]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
        </group>
      </RigidBody>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          depthTest={false}
          map={ropeTexture}
          repeat={[-4, 1]}
          color="#e5e5e5"
          resolution={[width, height]}
          useMap
          lineWidth={0.8}
        />
      </mesh>
    </>
  );
}
