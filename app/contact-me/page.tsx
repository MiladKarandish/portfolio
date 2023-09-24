import styles from "./contact.module.scss";
import githubIcon from "@/public/icons/github.svg";
import linkedinIcon from "@/public/icons/linkedin.svg";
import mailIcon from "@/public/icons/mail.svg";
import telegram from "@/public/icons/telegram.svg";

export interface Props {}

const ContactMe = ({}: Props) => {
  const socials = [
    {
      href: "https://github.com/MiladKarandish",
      label: "github",
      icon: githubIcon,
    },
    {
      href: "https://www.linkedin.com/in/miladkarandish",
      label: "linkedin",
      icon: linkedinIcon,
    },
    {
      href: "mailto:miladkaarandish@gmail.com",
      label: "email",
      icon: mailIcon,
    },
    {
      href: "https://t.me/MiladKaarandish",
      label: "telegram",
      icon: telegram,
    },
  ];

  return (
    <main className={`${styles["_"]}`}>
      <section>
        <h2>About Me</h2>
        <p>
          As a proficient front-end web developer with more than three years of
          experience, my area of expertise involves creating exceptional web
          applications that are intuitive and user-friendly. With my in-depth
          knowledge of HTML, CSS, and JavaScript, I am skilled in building
          highly functional websites. Moreover, I have extensive experience
          working with various front-end frameworks such as React and Vue,
          enabling me to develop complex web applications easily. I am
          passionate about creating responsive designs that work seamlessly on
          all devices. I am always eager to stay up-to-date with the latest
          trends and technologies in web development to enhance my skills and
          knowledge further. I have experienced that anything is achievable With
          determination, perseverance, and belief in oneself.
        </p>
      </section>

      <section>
        {socials.map((social) => (
          <div className={`${styles["_contact"]}`}>
            <span>Reach out to me via {social.label}</span>
            <a href={social.href}>{social.label}</a>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ContactMe;
