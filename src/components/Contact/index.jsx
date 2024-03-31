'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const variants = {
    initial: {
        y: 500,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
}

const Contact = () => {
    const ref = useRef()
    const formRef = useRef()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const isInView = useInView(ref, { margin: '-100px' })

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_ydfsg5q',
                'template_w3y8fgh',
                formRef.current,
                'kdY_aIFRMOZDc1CQx'
            )
            .then(
                (result) => {
                    setSuccess(true)
                },
                (error) => {
                    setError(true)
                    console.log(error.text)
                }
            )
    }

    return (
        <section
            className=" w-full flex items-center relative snap-center bg-gradient-to-b
from-slate-950 to-slate-800"
            id="Contact"
        >
            <div className=" absolute w-full h-10" ref={ref}></div>
            <motion.div
                className="w-full h-full p-2 flex flex-col sm:max-w-7xl m-auto items-center justify-center  gap-11"
                variants={variants}
                initial="initial"
                whileInView="animate"
            >
                <motion.div
                    className=" flex-1 flex flex-col text-center items-center  mt-8 sm:gap-10 "
                    variants={variants}
                >
                    <motion.h2
                        variants={variants}
                        className=" text-3xl sm:text-6xl leading-[80px] "
                    >
                        Ecrivez moi !
                    </motion.h2>
                    <motion.div className="item" variants={variants}>
                        <h3>Mail</h3>
                        <span className="font-light">n.alchami@gmail.com</span>
                    </motion.div>
                </motion.div>
                <div className="flex-1 flex flex-col w-full items-center justify-center relative p-6 max-w-screen-sm">
                    <motion.form
                        className="w-full sm:w-3/4 flex flex-col gap-5"
                        ref={formRef}
                        onSubmit={sendEmail}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 3 }}
                    >
                        <input
                            className=" p-3 sm:p-5 bg-transparent border-2 border-solid border-white text-white rounded-md"
                            type="text"
                            placeholder="Name"
                            name="user_name"
                            aria-label="name"
                            required
                        />
                        <input
                            className=" p-3 sm:p-5 bg-transparent border-2 border-solid border-white text-white rounded-md"
                            type="email"
                            required
                            placeholder="Email"
                            name="user_email"
                            aria-label="email"
                        />
                        <textarea
                            rows={4}
                            className=" p-3 sm:p-5 bg-transparent border-2 border-solid border-white text-white rounded-md"
                            placeholder="Message"
                            name="message"
                            aria-label="message"
                            required
                        />
                        <button
                            name="envoyer l'email"
                            className="p-3 sm:p-5 border-none bg-orange-400 text-black cursor-pointer rounded-md font-medium"
                        >
                            Envoyer!
                        </button>
                        {error && 'Error'}
                        {success && 'Merci ! je vous contacte au plus vite!'}
                    </motion.form>
                </div>
            </motion.div>
        </section>
    )
}

export default Contact
