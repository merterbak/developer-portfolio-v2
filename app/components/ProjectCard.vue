<template>
    <div id="project" class="lg:mx-5">

        <span class="flex text-sm my-3">
            <h3 class="text-purplefy font-fira_bold mr-3">Project {{ Number(index) + 1 }}</h3>
            <h4 class="font-fira_retina text-menu-text"> // {{ project.title }}</h4>
        </span>

        <div id="project-card" class="flex flex-col">
            <div id="window">
                <div class="absolute flex right-3 top-3">
                <img v-for="tech in project.tech" :key="tech" :src="'/icons/techs/filled/' + tech + '.svg'" alt="" class="w-6 h-6 mx-1 hover:opacity-75">
                </div>
                <img id="showcase" :src="repoData ? `https://opengraph.githubassets.com/1/${repoOwner}/${repoName}` : hfData ? `https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/${hfOwner}/${hfSpace}.png` : project.img" alt="" class="" @error="onImgError">
            </div>

            <div class="pb-8 pt-6 px-6 border-top">
                <p v-if="!repoData && !hfData" class="text-menu-text font-fira_retina text-sm mb-5">
                {{ project.description }}
                </p>

                <!-- Hugging Face stats -->
                <div v-if="hfData" class="flex items-center gap-4 mb-4 font-fira_retina text-xs text-menu-text">
                    <span class="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {{ hfData.likes }}
                    </span>
                </div>

                <!-- GitHub stats -->
                <div v-if="repoData" class="flex items-center gap-4 mb-4 font-fira_retina text-xs text-menu-text">
                    <span v-if="repoData.language" class="flex items-center gap-1">
                        <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: repoData.langColor }"></span>
                        {{ repoData.language }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>
                        {{ repoData.stars }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 0-1.5 0v.878H6.25v-.878a2.25 2.25 0 1 0-1.5 0ZM7.25 8.75a.75.75 0 0 1 1.5 0v2.878a2.25 2.25 0 1 0-1.5 0V8.75z"/></svg>
                        {{ repoData.forks }}
                    </span>
                </div>

                <a id="view-button" :href="project.url" target="_blank" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg">
                    view-project
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const { project, index } = defineProps(['project', 'index'])

const githubCache = inject('githubCache', ref({}))
const hfCache = inject('hfCache', ref({}))

const isGithub = project.url.includes('github.com')
const isHuggingFace = project.url.includes('huggingface.co')
const parts = isGithub ? project.url.replace('https://github.com/', '').split('/') : []
const repoOwner = parts[0] || ''
const repoName = parts[1] || ''

const hfParts = isHuggingFace ? project.url.replace('https://huggingface.co/spaces/', '').split('/') : []
const hfOwner = hfParts[0] || ''
const hfSpace = hfParts[1] || ''

const langColors = {
    'Python': '#3572A5',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Jupyter Notebook': '#DA5B0B',
    'Vue': '#41b883',
    'Rust': '#dea584',
    'Go': '#00ADD8',
    'Java': '#b07219',
}

const repoData = computed(() => {
    if (!isGithub) return null
    const key = `${repoOwner}/${repoName}`.toLowerCase()
    const data = githubCache.value[key]
    if (!data) return null
    return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        langColor: langColors[data.language] || '#8b949e',
    }
})

const hfData = computed(() => {
    if (!isHuggingFace) return null
    const key = `${hfOwner}/${hfSpace}`.toLowerCase()
    const data = hfCache.value[key]
    if (!data) return null
    return { likes: data.likes }
})

function onImgError(e) {
    if (e.target.src !== project.img) {
        e.target.src = project.img
    }
}
</script>

<style scoped>
#project {
  min-width: 400px;
  margin-bottom: 5px;
}

#project-card {
  border: 1px solid #1E2D3D;
  background-color: #011221;
  border-radius: 15px;
  max-width: 400px;
}

#window {
  max-height: 200px;
  position: relative;
  overflow: hidden;
}

#showcase {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

@media (max-width: 768px) {
  #project {
    min-width: 100%;
  }
}

@media (min-width: 768px) {
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 5px;
  }
}

@media (min-width: 1350px) {
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 20px;
  }
}

</style>
