// templates.ts

import { SocialLinksData } from '@/app/components/SocialLinks';

const generateSocialLinksHTML = (links: SocialLinksData): string => {
    const iconMap: { [key: string]: string } = {
        youtube: "https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-gedp2icy.png",
        linkedin: "https://user-images.githubusercontent.com/88904952/234979284-68c11d7f-1acc-4f0c-ac78-044e1037d7b0.png",
        stackoverflow: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/stack-overflow.svg",
        facebook: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg",
        instagram: "https://user-images.githubusercontent.com/88904952/234981169-2dd1e58f-4b7e-468c-8213-034ba62156c3.png"
    };

    return Object.entries(links)
        .filter(([_, url]) => url)
        .map(([platform, url]) => `<a href="${url}" target="blank">
            <img align="center" src="${iconMap[platform]}" alt="${platform}" height="50" width="50" />
        </a>
    `).join('');
};

export const template1 = (aboutData: {
    working: string;
    learning: string;
    funFact: string;
}, skills: string[], socialLinks: SocialLinksData): string => {
    return `<h1 align="center"> Hello Folks 👋</h1>

## 🙂 About Me
<table align="center"  width="100%">
<tr border="none">
<td width="60%" align="left">

- 🔭 I'm currently working on ${aboutData.working}
- 🌱 I'm currently learning ${aboutData.learning}
- ⚡ Fun fact: ${aboutData.funFact}

</td>
<td width="40%" align="center">
  <img align="center" alt="Coding" height="250" width="300" src="https://raw.githubusercontent.com/SubhadeepZilong/SubhadeepZilong/main/icons/animation_500_kxa883sd.gif">
</td>
</tr>
</table>

## 👨‍💻 Technologies I Know 
${skills.length > 0 ? `
<p align="center">
    <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=${skills.join(',')}&perline=14" />
    </a>
</p>
    ` : ''}

## 📊 GitHub Statistics  

## 🤝Connect with me:
${Object.values(socialLinks).some(link => link) ? `
<p align="center" style="display: flex; justify-content: center; gap: 10px;">${generateSocialLinksHTML(socialLinks)}
</p>
` : ''}
`;
};

export const template2 = (aboutData: {
    working: string;
    learning: string;
    funFact: string;
}, skills: string[], socialLinks: SocialLinksData): string => {
    return `<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Hello 👋 coders/>


${Object.values(socialLinks).some(link => link) ? `<p align="left" style="display: flex; justify-content: start; gap: 10px;">${generateSocialLinksHTML(socialLinks)}</p>
    ` : ''}

**Talking about Personal Stuffs:**
<img align="right" alt="Coding" height="300" width="250" src="https://owaisnoor.info/blog/wp-content/uploads/2019/03/maxresdefault.jpg">

- 🔭 I'm currently working on ${aboutData.working}
- 🌱 I'm currently learning ${aboutData.learning}
- ⚡ Fun fact: ${aboutData.funFact}

**Languages and Tools:** 
${skills.length > 0 ? `<p align="left">
        <a href="https://skillicons.dev">
            <img src="https://skillicons.dev/icons?i=${skills.join(',')}&perline=4" />
        </a>
    </p>
        ` : ''}
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
    `;

};

export const template3 = (aboutData: {
    working: string;
    learning: string;
    funFact: string;
}, skills: string[], socialLinks: SocialLinksData): string => {
    return`<img src="https://raw.githubusercontent.com/KevinPatel04/KevinPatel04/master/cover-thompson.png">
<h1 align="center"> Hello Amingos 👋</h1>

<div align="center">
🔭 I'm currently working on ${aboutData.working}<br>
🌱 I'm currently learning ${aboutData.learning}<br>
⚡ Fun fact: ${aboutData.funFact}
</div>

## ⚙️ Tech Stack
${skills.length > 0 ? `
<p align="center">
    <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=${skills.join(',')}&perline=14" />
    </a>
</p>
    ` : ''}

## 🔗 Social Links:
${Object.values(socialLinks).some(link => link) ? `
<p align="left" style="display: flex; justify-content: start; gap: 10px;">${generateSocialLinksHTML(socialLinks)}
</p>
` : ''}
    `;


};