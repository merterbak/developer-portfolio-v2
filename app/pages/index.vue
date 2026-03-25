<template>
	<main v-if="!loading" id="hello" :style="{ height: windowHeight + 'px' }">
	  <div class="css-blurry-gradient-blue"></div>
	  <div class="css-blurry-gradient-green"></div>
  
	  <section class="hero">
		<div class="head">
		  <span>
			Hi all, I am
		  </span>
		  <h1>{{ config.name }}</h1>
		  <span class="diple flex">
			>&nbsp;
			<h2 class="line-1 anim-typewriter max-w-fit"> {{ config.role }} </h2>
		  </span>
		</div>
  
		<div id="info">
		  <span class="action">
			// complete the game to continue
		  </span>
		  <span :class="{hide: isMobile}">
			// you can also see my Github page
		  </span>
		  <span :class="{hide: !isMobile}">
			// find my profile on Github:
		  </span>
		  <p class="code">
			<span class="identifier">
			  const
			</span>
			<span class="variable-name">
			  githubLink
			</span>
			<span class="operator">
			  =
			</span>
			<a class="string" :href="'https://github.com/' + config.contacts.social.github.user">
			  "https://github.com/{{ config.contacts.social.github.user }}"
			</a>
		  </p>
		</div>
	  </section>
  
	  <section data-aos="fade-up" class="game" v-if="!isMobile">
		<SnakeGame />
	  </section>
	</main>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import DevConfig from '~/developer.json'
  
  const config = ref(DevConfig)
  const isMobile = ref(false)
  const loading = ref(false)
  const windowHeight = ref(0)
  
  function handleResize() {
	if (typeof window !== 'undefined') {
	  windowHeight.value = window.innerHeight
	  isMobile.value = window.innerWidth <= 1024
	}
  }
  
  function preventArrowScrolling(e) {
	const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
	if (arrowKeys.includes(e.key)) {
	  e.preventDefault()
	}
  }
  
  onMounted(() => {
	if (typeof window !== 'undefined') {
	  windowHeight.value = window.innerHeight
	  window.addEventListener('resize', handleResize)
	  window.addEventListener('keydown', preventArrowScrolling, { passive: false })
	  isMobile.value = window.innerWidth <= 1024
	}
  })
  
  onBeforeUnmount(() => {
	if (typeof window !== 'undefined') {
	  window.removeEventListener('resize', handleResize)
	  window.removeEventListener('keydown', preventArrowScrolling)
	}
  })
  </script>
  
  <style scoped>
  #hello {
	display: flex;
	width: 100%;
	flex: 1 1 auto;
	padding-left: 275px;
	overflow: hidden;
  }
  
  .hero {
	width: 100%;
	justify-content: center;
  }
  
  .game {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	z-index: 20;
  }
  
  #hello .hero {
	display: flex;
	flex-direction: column;
	margin: 0rem;
  }
  
  #hello .head span {
	font-size: 18px;
	line-height: 1;
	color: #E5E9F0;
	font-family: 'Fira Code Retina';
  }
  
  #hello .head h1 {
	font-size: 58px;
	line-height: 1;
	color: #E5E9F0;
	font-family: 'Fira Code Regular';
	padding-top: 1rem;
	padding-bottom: 1rem;
  }
  
  #hello .head h2, #hello .head .diple {
	font-size: 32px;
	line-height: 1;
	color: #4D5BCE;
	font-family: 'Fira Code Retina';
  }
  
  .head {
	padding-bottom: 3rem;
  }
  
  #info {
	display: flex;
	flex-direction: column;
	padding-block: 2.5rem;
	font-size: 14px;
  }
  
  #info > span {
	font-size: 14px;
	line-height: 1;
	color: #8da9c6;
	font-family: 'Fira Code Retina';
	padding-bottom: 1rem;
  }
  
  .code {
	font-family: 'Fira Code Medium';
	color: #E5E9F0;
  }
  
  .code .identifier {
	color: #6172ff;
  }
  
  .code .variable-name {
	color: #43D9AD;
  }
  
  .code .operator {
	color: white;
  }
  
  .code .string {
	color: #E99287;
	text-decoration-line: underline;
	text-underline-offset: 4px;
  }
  
  #info .action {
	display: flex;
  }
  
  .hide {
	display: none;
  }
  
  .css-blurry-gradient-blue {
	position: fixed;
	bottom: 25%;
	right: 5%;
	width: 300px;
	height: 300px;
	border-radius: 0% 0% 50% 50%;
	rotate: 10deg;
	filter: blur(70px);
	background: radial-gradient(circle at 50% 50%,rgba(77, 91, 206, 1), rgba(76, 0, 255, 0));
	opacity: 0.5;
	z-index: 10;
  }
  
  .css-blurry-gradient-green {
	position: absolute;
	top: 20%;
	right: 30%;
	width: 300px;
	height: 300px;
	border-radius: 0% 50% 0% 50%;
	filter: blur(70px);
	background: radial-gradient(circle at 50% 50%,rgba(67, 217, 173, 1), rgba(76, 0, 255, 0));
	opacity: 0.5;
	z-index: 10;
  }
  
  .line-1 {
	width: fit-content;
	border-right: 3px solid rgba(255,255,255,.75);
	white-space: nowrap;
	overflow: hidden;
	padding-right: 2px;
  }
  
  .anim-typewriter{
	animation: typewriter 3.5s steps(40) 1s 1 normal both,
			   blinkTextCursor 800ms steps(40) infinite normal;
  }
  
  @keyframes typewriter{
	from{width: 0;}
	to{width: 100%;}
  }
  
  @keyframes blinkTextCursor{
	from{border-right-color: rgba(255,255,255,.75);}
	to{border-right-color: transparent;}
  }
  
  @media (max-width: 768px) {
	#hello {
	  padding-left: 0;
	}
	#hello .hero {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  margin: 1.75rem;
	}
	.head {
	  padding-top: 4rem;
	}
	#hello .head h2, #hello .head .diple {
	  font-size: 20px;
	  color: #43D9AD;
	}
	#info .action {
	  display: none;
	}
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
	#hello {
	  padding-left: 0;
	}
	#hello .hero {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  margin: 1.75rem;
	}
	.head {
	  padding-top: 4rem;
	}
  }
  
  @media (min-width: 1024px) and (max-width: 1320px) {
	#hello {
	  padding-left: 135px;
	}
  }
  
  @media (min-width: 1024px) {
	.css-blurry-gradient-blue {
	  position: fixed;
	  bottom: 10%;
	  right: 10%;
	  width: 500px;
	  height: 500px;
	  opacity: 0.7;
	  border-radius: 100% 50% 100% 0%;
	}
	.css-blurry-gradient-green {
	  position: fixed;
	  top: 10%;
	  right: 35%;
	  filter: blur(100px);
	  rotate: 10deg;
	  width: 400px;
	  height: 400px;
	  opacity: 0.5;
	  border-radius: 100% 0% 0% 0%;
	  rotate: 20deg;
	}
  }
  
  @media (min-width: 1920px){
	#hello {
	  padding-left: 310px;
	}
	#hello .head h1 {
	  font-size: 62px;
	}
  }
  </style>