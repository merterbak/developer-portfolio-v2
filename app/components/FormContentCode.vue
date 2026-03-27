<template>
    <div class="code-container flex font-fira_retina text-menu-text">
        <div class="line-numbers lg:flex flex-col w-16 hidden">

            <!-- line numbers and asteriscs -->
            <div v-for="n in lines" class="grid grid-cols-2 justify-end" :key="n">
                <span class="col-span-1 mr-3">{{ n }}</span>
            </div>
        </div>
        <div class="font-fira_retina text-white text-container">
            <p>
                <span class="tag">
                    const
                </span>
                <span class="tag-name">
                    button
                </span>
                =
                <span class="tag-name">
                    document.querySelector
                    <span class="text-menu-text">
                        (
                        <span class="text-codeline-link">
                            '#sendBtn'
                        </span>
                        );
                    </span>
                </span>

            </p>
            <br>
            <p class="text-menu-text">
                <span class="tag">
                    const
                </span>
                <span class="tag-name">
                    message
                </span>
                = {
                <br> &nbsp;&nbsp;
                <span id="name" class="tag-name">
                    name
                </span>
                :
                <span class="text-codeline-link">"</span>
                <span id="name-value" class="text-codeline-link">
                    {{ name }}
                </span>
                <span class="text-codeline-link">"</span>
                , <br> &nbsp;&nbsp;
                <span id="email" class="tag-name">
                    email
                </span>
                :
                <span class="text-codeline-link">"</span>
                <span id="email-value" class="text-codeline-link">
                    {{ email }}
                </span>
                <span class="text-codeline-link">"</span>
                , <br> &nbsp;&nbsp;
                <span id="message" class="tag-name">
                    message
                </span>
                :
                <span class="text-codeline-link">"</span>
                <span id="message-value" class="text-codeline-link">
                    {{ message }}
                </span>
                <span class="text-codeline-link">"</span>
                , <br> &nbsp;&nbsp;
                date:
                <span class="text-codeline-link">
                    "{{ date }}"
                </span>
                <br>
                }
            </p>
            <br>
            <p>
                <span class="tag-name">
                    button.addEventListener

                    <span class="text-menu-text">
                        (
                        <span class="text-codeline-link">
                            'click'
                        </span>
                        ), ()
                        <span class="tag">
                            =>
                        </span>
                        {
                        <br>
                    </span>
                    &nbsp;&nbsp;form.send
                    <span class="text-menu-text">(</span>
                    message
                    <span class="text-menu-text">); <br> })</span>
                </span>

            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: new Date().toDateString(),
            lines: 0
        }
    },
    props: {
        name: String,
        email: String,
        message: String,
    },
    mounted() {
        this.updateLines();
        window.addEventListener("resize", this.updateLines);
        window.addEventListener("input", this.updateLines);
        window.addEventListener("click", this.updateLines);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLines);
        window.removeEventListener("click", this.updateLines);
        window.removeEventListener("input", this.updateLines);
    },
    methods: {
        updateLines() {
            const textContainer = this.$el.querySelector(".text-container");
            const style = window.getComputedStyle(textContainer);
            const lineHeight = parseInt(style.lineHeight);
            const maxHeight = textContainer.offsetHeight;
            this.lines = Math.ceil(maxHeight / lineHeight);
        }
    }
}
</script>

<style>
.tag {
    color: #C98BDF;
}

.tag-name {
    color: #819bff;
}

.arrow {
    color: #F8F8F8;
}

.code-container {
    display: flex;
    align-items: flex-start;
}

.line-numbers {
    text-align: right;
    line-height: 1.5em;
}

.text-container {
    width: 100%;
    padding-left: 0px;
    line-height: 1.5em;
    overflow: hidden;
}

.text-container span#name-value,
.text-container span#email-value,
.text-container span#message-value {
    word-break: break-all;
}
</style>