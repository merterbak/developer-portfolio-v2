<template>
    <div v-if="submitted" class="flex flex-col items-center justify-center h-full text-center">
        <span class="text-greenfy text-lg font-fira_bold mb-3">Thank you!</span>
        <p class="font-fira_retina text-menu-text text-sm mb-5">Your message has been sent successfully.</p>
        <button id="submit-button" class="py-2 px-4" @click="submitted = false">send-new-message</button>
    </div>
    <form v-else id="contact-form" class="text-sm" @submit.prevent="submitForm">
        <p class="font-fira_retina text-menu-text text-sm mb-5">// This is the fastest way to contact me. Drop a message and I'll get back to you shortly.</p>
        <div class="flex flex-col">
            <label for="name-input" class="mb-3">_name:</label>
            <input type="text" id="name-input" name="name" :placeholder="name" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="email-input" class="mb-3">_email:</label>
            <input type="email" id="email-input" name="email" :placeholder="email" class="p-2 mb-5 placeholder-slate-600" required>
        </div>
        <div class="flex flex-col">
            <label for="message-input" class="mb-3">_message:</label>
            <textarea id="message-input" name="message" :placeholder="message" class="placeholder-slate-600" required></textarea>
        </div>
        <button id="submit-button" type="submit" class="py-2 px-4" :disabled="submitting">
            {{ submitting ? 'sending...' : 'submit-message' }}
        </button>
    </form>
</template>

<script setup>
const props = defineProps({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
})

const submitted = ref(false)
const submitting = ref(false)

async function submitForm(e) {
    submitting.value = true
    const form = e.target
    const data = new FormData(form)
    await fetch('https://formspree.io/f/mgopeqvb', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    submitting.value = false
    submitted.value = true
    form.reset()
}
</script>

<style>

form {
    @apply font-fira_retina text-menu-text
}
input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    
}
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(190, 190, 190);
  transition: background-color 5000s ease-in-out 0s;
  border: 2px solid #607b96;
}

#message-input {
    background-color: #011221;
    border: 2px solid #1E2D3D;
    border-radius: 7px;
    resize: none;
    height: 150px;
    padding: 10px;
}

#submit-button {
    @apply font-fira_retina text-white text-sm;
    background-color: #1E2D3D;
    border-radius: 7px;
    margin-top: 20px;
    cursor: pointer;
}

#submit-button:hover {
    background-color: #263B50;
}

input:focus, #message-input:focus {
    outline: none;
    transition: none;
    border: 2px solid #607b96;
    box-shadow: #607b9669 0px 0px 0px 2px;
  }

#contact-form {
    max-width: 370px;
    width: 100%;
}

@media (max-width: 1920px) {
    #contact-form {
        max-width: 320px;
        max-height: 400px;
    }
    #submit-button {
        /* width: 100%; */
        font-size: 12px;
    }
    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }
    input {
        font-size: 13px;
    }
}
</style>