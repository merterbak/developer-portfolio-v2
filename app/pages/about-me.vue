<template>
  <main v-if="!loading" id="about-me" class="page">

    <div id="mobile-page-title">
      <h2>_about-me</h2>
    </div>

    <div id="page-menu" class="w-full flex">
      
      <!-- focused section content -->
      <div id="section-content" class="hidden lg:block w-full h-full border-right">

        <!-- title -->
        <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
          <img id="section-arrow-menu" src="/icons/arrow.svg" alt="" class="section-arrow mx-3 open">
          <p v-html="config.about.sections[currentSection]?.title" class="font-fira_regular text-white text-sm"></p>
        </div>

        <!-- folders -->
        <div>
          <div v-for="(folder, key, index) in config.about.sections[currentSection]?.info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text">
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer" @click="toggleFolder(folder.title)">
              <img id="diple" src="/icons/diple.svg" alt="" :class="{ open: openFolders.includes(folder.title) }">
              <img :src="'/icons/folder' + (index+1) + '.svg'" alt="" class="mr-3">
              <p :id="folder.title" v-html="key"></p>
            </div>
            <div v-if="folder.files !== undefined && openFolders.includes(folder.title)" class="col-span-2">
              <div v-for="(file, fkey) in folder.files" :key="fkey" class="hover:text-white hover:cursor-pointer flex my-2" @click.stop="onFileClick(fkey, file, folder)">
                <img :src="fkey.endsWith('.py') ? '/icons/python.svg' : '/icons/markdown.svg'" alt="" class="ml-8 mr-3 w-4 h-4"/>
                <p :class="{ active: selectedFile === fkey }">{{ fkey }}</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <!-- mobile -->
      <div id="section-content" class="lg:hidden w-full font-fira_regular">

        <div v-for="section in config.about.sections" :key="section.title">
          
          <!-- section title (mobile) -->
          <div :key="section.title" :src="section.icon" id="section-content-title" class="flex lg:hidden mb-1" @click="focusCurrentSection(section)">
            <img src="/icons/arrow.svg" :id="'section-arrow-' + section.title" alt="" class="section-arrow">
            <p v-html="section.title" class=" text-white text-sm"></p>
          </div>

          <!-- folders -->
          <div :id="'folders-' + section.title" class="hidden">
            <div v-for="(folder, key, index) in config.about.sections[section.title]?.info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text">
              <div class="flex col-span-2 hover:text-white hover:cursor-pointer" @click="toggleFolder(folder.title)">
                <img id="diple" src="/icons/diple.svg" :class="{ open: openFolders.includes(folder.title) }">
                <img :src="'icons/folder' + (index+1) + '.svg'" alt="" class="mr-3">
                <p :id="folder.title" v-html="key"></p>
              </div>
              <div v-if="folder.files !== undefined && openFolders.includes(folder.title)" class="col-span-2">
                <div v-for="(file, fkey) in folder.files" :key="fkey" class="hover:text-white hover:cursor-pointer flex my-2" @click.stop="onFileClick(fkey, file, folder)">
                  <img :src="fkey.endsWith('.py') ? '/icons/python.svg' : '/icons/markdown.svg'" alt="" class="ml-8 mr-3 w-4 h-4"/>
                  <p :class="{ active: selectedFile === fkey }">{{ fkey }}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>


      </div>

    </div>
    <!-- MENU END -->

    <!-- content -->
    <div class="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
      
      <div id="left" class="w-full flex flex-col border-right">
        
        <!-- windows tab desktop -->
        <div class="tab-height w-full hidden lg:flex border-bot items-center">
          <div class="flex items-center border-right h-full">
            <p v-html="config.about.sections[currentSection]?.title" class="font-fira_regular text-menu-text text-sm px-3"></p>
            <img src="/icons/close.svg" alt="" class="mx-3">
          </div>
        </div>

        <!-- windows tab mobile -->
        <div id="tab-mobile" class="flex lg:hidden font-fira_retina">
            <span class="text-white">// </span>
            <h3 v-html="config.about.sections[currentSection]?.title" class="text-white px-2"></h3>
            <span class="text-menu-text"> / </span>
            <h3 class="text-menu-text pl-2">{{ showingCode ? codeFileName : config.about.sections[currentSection]?.info[folder]?.title }}</h3>
        </div>
        
        <!-- text -->
        <div id="commented-text" class="flex h-full w-full lg:border-right overflow-hidden">

          <div class="w-full h-full ml-5 mr-10 lg:my-5 overflow-scroll">
              <!-- mobile gist view -->
              <div v-if="showingCode && codeLines" class="lg:hidden font-fira_retina text-menu-text" style="padding-left: 10px; overflow-x: auto;">
                <highlightjs :code="codeContent" :language="codeLang" />
              </div>
              <!-- description text -->
              <div :class="{ 'hidden lg:flex': showingCode && codeLines }" class="flex font-fira_retina text-menu-text">
                <div class="line-numbers lg:flex flex-col hidden" style="min-width: 50px; text-align: right; padding-right: 15px; user-select: none;">
                  <span v-for="n in mdLines" :key="n" style="line-height: 1.5em;">{{ n }}</span>
                </div>
                <div id="md-text" class="text-container py-10 lg:py-0" style="padding-left: 10px; line-height: 1.5em;">
                  <p v-html="config.about.sections[currentSection]?.info[folder].description"></p>
                </div>
              </div>
          </div>
          
          <!-- scroll bar -->
          <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
            <div id="scroll">
          </div>

        </div>

      </div>

    </div>

    <div id="right" class="max-w-full hidden lg:flex flex-col">

      <!-- windows tab -->
      <div class="tab-height w-full h-full hidden lg:flex border-bot items-center">
        <div v-if="codeFileName" class="flex items-center border-right h-full">
          <p class="font-fira_regular text-menu-text text-sm px-3">{{ codeFileName }}</p>
          <img src="/icons/close.svg" alt="" class="mx-3">
        </div>
      </div>

      <div id="gists-content" class="flex">
        <div class="w-full h-full lg:my-5 overflow-scroll">
          <div v-if="codeLines" class="code-container flex font-fira_retina text-menu-text">
            <div class="line-numbers lg:flex flex-col hidden" style="min-width: 50px; text-align: right; padding-right: 15px; user-select: none;">
              <span v-for="n in codeLines.length" :key="n" style="line-height: 1.5em;">{{ n }}</span>
            </div>
            <div class="text-container" style="padding-left: 10px; flex: 1; overflow-x: auto;">
              <highlightjs :code="codeContent" :language="codeLang" />
            </div>
          </div>
          <p v-else class="font-fira_retina text-menu-text text-sm lg:px-6 lg:py-4">Loading gist...</p>
        </div>

        <!-- scroll bar -->
        <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
          <div id="scroll"></div>
        </div>
      </div>
    </div>

    </div>
  </main>
</template>

<style>

#sections {
  width: 5rem; /* 80px */
  height: 100%;
  display: none;
  border-right: 1px solid #1E2D3D;
}

/* LG */
@media (min-width: 1024px) {
  #sections {
    display: block;
  }
}

#section-icon {
  @apply my-6 hover:cursor-pointer flex justify-center;
  opacity: 0.4;
}

#section-icon.active {
  opacity: 1;
}

#section-icon:hover {
  opacity: 1;
}

.tab-height {
  min-height: 35px;
  max-height: 35px;
}

#tab-mobile {
  padding: 25px 20px 0px 25px;
  align-items: flex-end;
}

#scroll-bar{
  width: 20px;
}

#scroll {
  width: 14px;
  height: 7px;
  background-color: #607B96;
}

#diple {
  @apply mx-3 w-2 max-w-fit;
}

.open {
  transform: rotate(90deg);
}

.active {
  color:white;
}

#right, #left {
  height: 100%;
  overflow: hidden;
}

#gists-content {
  height: 100%;
  overflow: hidden;
}

@media (max-width: 1024px) {
  #gists-content {
    height: 100%;
    padding: 0px 25px;
    overflow: hidden;
  }

  #about {
  min-height: stretch;
}
}

.section-arrow {
  transition: 0.1s;
}

#section-content #contacts {
  padding: 0px 25px;
}

.hljs{color:#85a9ce;background:transparent;line-height:1.5em}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}

#about-me pre {
  margin: 0;
  font-family: inherit;
  font-size: 0.75rem;
  line-height: 1.5em;
  padding: 0;
}

#about-me pre code.hljs {
  padding: 0;
}

#right .line-numbers span {
  font-size: 0.75rem;
}

</style>

<script>
import DevConfig from '~/developer.json';
let hljsVuePlugin = null
if (import.meta.client) {
  hljsVuePlugin = (await import('@highlightjs/vue-plugin')).default
  await import('highlight.js/lib/common')
}
export default {
  data() {
    return {
      currentSection: 'personal-info',
      folder: 'bio',
      loading: true,
      codeContent: null,
      codeLines: null,
      codeFileName: null,
      codeLang: 'python',
      selectedFile: 'bio.md',
      openFolders: ['bio', 'interests', 'education', 'code-snippets'],
      mdLines: 3,
      showingCode: false,
      snippets: {
        'attention.py': `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def scaled_dot_product(self, Q, K, V, mask=None):
        scores = torch.matmul(Q, K.transpose(-2, -1))
        scores = scores / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn = torch.softmax(scores, dim=-1)
        return torch.matmul(attn, V)

    def forward(self, x, mask=None):
        batch_size = x.size(0)

        Q = self.W_q(x).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch_size, -1, self.n_heads, self.d_k).transpose(1, 2)

        out = self.scaled_dot_product(Q, K, V, mask)
        out = out.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        return self.W_o(out)`,
        'api.py': `from openai import OpenAI

client = OpenAI()

def chat(prompt, model="gpt-4o", temperature=0.7):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature,
    )
    return response.choices[0].message.content

def generate_embeddings(texts, model="text-embedding-3-small"):
    response = client.embeddings.create(
        model=model,
        input=texts,
    )
    return [item.embedding for item in response.data]

def stream_response(prompt, model="gpt-4o"):
    stream = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "user", "content": prompt}
        ],
        stream=True,
    )
    for chunk in stream:
        content = chunk.choices[0].delta.content
        if content:
            print(content, end="", flush=True)`
      },
    }
  },
  /**
   * In setup we can define the data we want to use in the component before the component is created.
   */
  setup() {
    return {
      config: DevConfig
    }
  },
  computed: {
    isActive() {
      return folder => this.folder === folder;
    },
    isSectionActive() {
      return section => this.currentSection === section;
    },
    isOpen() {
      return folder => this.folder === folder;
    },
  },
  methods: {
    focusCurrentSection(section) {
      this.currentSection = section.title
      this.folder = Object.keys(section.info)[0]

      document.getElementById('folders-' + section.title).classList.toggle('hidden') // show folders
      document.getElementById('section-arrow-' + section.title).classList.toggle('rotate-90'); // rotate arrow
    },
    focusCurrentFolder(folder) {
      this.folder = folder.title
      this.currentSection = this.config.about.sections[this.currentSection].info[folder.title] ? this.currentSection : Object.keys(this.config.about.sections).find(section => this.config.about.sections[section].info[folder.title])
    },
    toggleFolder(title) {
      const idx = this.openFolders.indexOf(title)
      if (idx >= 0) {
        this.openFolders.splice(idx, 1)
      } else {
        this.openFolders.push(title)
      }
    },
    /* Mobile */
    showContacts() {
      document.getElementById('contacts').classList.toggle('hidden')
      document.getElementById('section-arrow').classList.toggle('rotate-90'); // rotate arrow
    },
    loadSnippet(fileName) {
      const code = this.snippets[fileName]
      if (!code) return
      this.codeFileName = fileName
      this.codeContent = code
      this.codeLines = code.split('\n')
    },
    onFileClick(fileName, fileValue, folder) {
      this.selectedFile = fileName
      if (fileName.endsWith('.py') && this.snippets[fileName]) {
        this.showingCode = true
        this.folder = 'code-snippets'
        this.loadSnippet(fileName)
      } else if (folder) {
        this.showingCode = false
        this.folder = folder.title
        this.$nextTick(() => this.updateMdLines())
      }
    },
    updateMdLines() {
      const el = this.$el.querySelector('#md-text')
      if (!el) return
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      this.mdLines = Math.max(Math.ceil(el.offsetHeight / lineHeight), 3)
    },
  },
  components: {
    highlightjs: hljsVuePlugin?.component
  },
  mounted(){
    this.loading = false
    this.loadSnippet('attention.py')
    this.$nextTick(() => {
      this.updateMdLines()
      window.addEventListener('resize', this.updateMdLines)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateMdLines)
  }
}
</script>