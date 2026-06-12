// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            keyframes: {
                'scale-fade': {
                    '0%': { transform: 'scale(0.8)', opacity: '0.3' },
                    '100%': { transform: 'scale(1.2)', opacity: '0.6' },
                },
            },
            animation: {
                'pingg-slow': 'scale-fade 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}