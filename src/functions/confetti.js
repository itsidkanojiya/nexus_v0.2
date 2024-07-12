import JSConfetti from 'js-confetti'
const canvas = document.getElementById('#canvas')

const jsConfetti = new JSConfetti({ canvas })
jsConfetti.addConfetti({
    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
});