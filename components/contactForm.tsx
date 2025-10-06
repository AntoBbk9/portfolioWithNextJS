// "use client";

// import Link from "next/link";
// import { useForm, Controller } from "react-hook-form";
// import { FaGithub, FaLinkedinIn } from "react-icons/fa";
// import axios from "axios";

// interface formSchema {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// type FormData = formSchema;

// function ContactForm() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>();


// const onSubmit = async (data: FormData) => {
//   try {
//     const res = await axios.post("/api/contact", data);

//     if (res.status === 200 && res.data.success) {
//       alert("✅ Message envoyé avec succès !");
//     } else {
//       alert("❌ Erreur : " + (res.data.error || "Impossible d’envoyer le message"));
//     }
//   } catch (error: any) {
//     console.error(error);
//     alert("⚠️ Erreur lors de l’envoi du message : " + (error.response?.data?.error || error.message));
//   }
// };


//   return (
//     <div className="w-[80%] mx-auto my-16">
//       <div className="">
//         <div className="grid md:grid-cols-2 gap-32">
//           <div className="flex justify-between flex-col">
//             <div>
//               <h1 className="font-sans font-bold text-3xl mb-4">
//                 CONTACTEZ-NOUS
//               </h1>
//               <p className="mb-2">
//                 Dites bonjour à l'adresse suivante{" "}
//                 <Link
//                   href="mailto:anthobelebele@gmail.com"
//                   className="text-[#BFDE42] underline hover:no-underline"
//                 >
//                   anthobelebele@gmail.com
//                 </Link>
//               </p>
//               <p className="mb-8">
//                 Pour plus d'informations, voici mon{" "}
//                 <a
//                   href="/CV_Antho_Belebele.pdf"
//                   download="Antoinette_Belebele_CV.pdf"
//                   className="underline"
//                 >
//                   CV
//                 </a>
//               </p>
//               <div className="flex gap-8 mb-8">
//                 <a href="https://www.linkedin.com/in/antoinette-belebele-443943260/">
//                   <FaLinkedinIn className="text-greenColor" size={24}/>
//                 </a>
//                 <a href="https://github.com/AntoBbk9">
//                   <FaGithub className="text-greenColor" size={24}/>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <p className="mt-auto">
//                 © 2025 Antoinette Belebele
//               </p>
//             </div>
//           </div>

//           <div className="">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block mb-2">
//                   Nom
//                 </label>
//                 <Controller
//                   name="name"
//                   control={control}
//                   defaultValue=""
//                   rules={{
//                     required: "Le nom est requis",
//                     minLength: {
//                       value: 3,
//                       message: "Le nom doit avoir au moins 3 caractères",
//                     },
//                   }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="text"
//                       id="name"
//                       className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
//                     />
//                   )}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-red-500">{errors.name.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block mb-2">
//                   Email
//                 </label>
//                 <Controller
//                   name="email"
//                   control={control}
//                   defaultValue=""
//                   rules={{
//                     required: "L'email est requis",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "L'email n'est pas valide",
//                     },
//                   }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="email"
//                       id="email"
//                       className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
//                     />
//                   )}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-red-500">{errors.email.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block mb-2">
//                   Sujet
//                 </label>
//                 <Controller
//                   name="subject"
//                   control={control}
//                   defaultValue=""
//                   rules={{
//                     required: "Le sujet est requis",
//                     minLength: {
//                       value: 5,
//                       message: "Le sujet doit contenir au moins 5 caractères",
//                     },
//                   }}
//                   render={({ field }) => (
//                     <input
//                       {...field}
//                       type="text"
//                       id="subject"
//                       className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
//                     />
//                   )}
//                 />
//                 {errors.subject && (
//                   <p className="mt-1 text-red-500">{errors.subject.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="message" className="block mb-2">
//                   Message
//                 </label>
//                 <Controller
//                   name="message"
//                   control={control}
//                   defaultValue=""
//                   rules={{
//                     required: "Le message est requis",
//                     minLength: {
//                       value: 10,
//                       message:
//                         "Le message doit contenir au moins 10 caractères",
//                     },
//                   }}
//                   render={({ field }) => (
//                     <textarea
//                       {...field}
//                       id="message"
//                       rows={6}
//                       className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42] resize-none"
//                     />
//                   )}
//                 />
//                 {errors.message && (
//                   <p className="mt-1 text-red-500">{errors.message.message}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-[#BFDE42] text-black rounded-full px-8 py-3 font-medium transition-colors disabled:opacity-50"
//               >
//                 {isSubmitting ? "ENVOI EN COURS..." : "Envoyer"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactForm;


"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

interface formSchema {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormData = formSchema;

function ContactForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/api/contact", data);

      if (res.status === 200 && res.data.success) {
        alert("✅ Message envoyé avec succès !");
        reset();
      } else {
        alert("❌ Erreur : " + (res.data.error || "Impossible d’envoyer le message"));
      }
    } catch (error: any) {
      console.error(error);
      alert("⚠️ Erreur lors de l’envoi du message : " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="w-[80%] mx-auto my-16">
      <div className="grid md:grid-cols-2 gap-32">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-sans font-bold text-3xl mb-4">CONTACTEZ-NOUS</h1>
            <p className="mb-2">
              Dites bonjour à l'adresse suivante{" "}
              <Link
                href="mailto:anthobelebele@gmail.com"
                className="text-[#BFDE42] underline hover:no-underline"
              >
                anthobelebele@gmail.com
              </Link>
            </p>
            <p className="mb-8">
              Pour plus d'informations, voici mon{" "}
              <a
                href="/CV_Antho_Belebele.pdf"
                download="Antoinette_Belebele_CV.pdf"
                className="underline"
              >
                CV
              </a>
            </p>
            <div className="flex gap-8 mb-8">
              <a href="https://www.linkedin.com/in/antoinette-belebele-443943260/">
                <FaLinkedinIn className="text-greenColor" size={24} />
              </a>
              <a href="https://github.com/AntoBbk9">
                <FaGithub className="text-greenColor" size={24} />
              </a>
            </div>
          </div>
          <div>
            <p className="mt-auto">© 2025 Antoinette Belebele</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/** NAME */}
            <div>
              <label htmlFor="name" className="block mb-2">Nom</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Le nom est requis",
                  minLength: { value: 3, message: "Le nom doit avoir au moins 3 caractères" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
                  />
                )}
              />
              {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
            </div>

            {/** EMAIL */}
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "L'email est requis",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "L'email n'est pas valide" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
                  />
                )}
              />
              {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
            </div>

            {/** SUBJECT */}
            <div>
              <label htmlFor="subject" className="block mb-2">Sujet</label>
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                rules={{
                  required: "Le sujet est requis",
                  minLength: { value: 5, message: "Le sujet doit contenir au moins 5 caractères" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="subject"
                    className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42]"
                  />
                )}
              />
              {errors.subject && <p className="mt-1 text-red-500">{errors.subject.message}</p>}
            </div>

            {/** MESSAGE */}
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{
                  required: "Le message est requis",
                  minLength: { value: 10, message: "Le message doit contenir au moins 10 caractères" },
                }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="message"
                    rows={6}
                    className="w-full bg-[#1A1A1A] p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#BFDE42] resize-none"
                  />
                )}
              />
              {errors.message && <p className="mt-1 text-red-500">{errors.message.message}</p>}
            </div>

            {/** SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#BFDE42] text-black rounded-full px-8 py-3 font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "ENVOI EN COURS..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
