import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output path
const outputPath = path.join(__dirname, '../public/resume.pdf');

// Create a document
const doc = new PDFDocument({ margin: 0, size: 'A4' });

// Pipe its output somewhere, like to a file or HTTP response
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const sidebarColor = '#1a202c'; // Dark gray/blue
const sidebarTextColor = '#ffffff';
const mainTextColor = '#333333';
const accentColor = '#8b5cf6'; // Purple

// Dimensions
const sidebarWidth = 200;
const pageWidth = 595.28; // A4 width in points
const pageHeight = 841.89; // A4 height in points
const contentWidth = pageWidth - sidebarWidth;

// --- Sidebar ---
doc.rect(0, 0, sidebarWidth, pageHeight)
   .fill(sidebarColor);

// Profile Image Placeholder (Circle)
const centerX = sidebarWidth / 2;
const centerY = 100;
const radius = 50;

doc.save();
doc.circle(centerX, centerY, radius).clip();
// If we had an image, we would draw it here. For now, fill with a lighter color
doc.rect(centerX - radius, centerY - radius, radius * 2, radius * 2).fill('#2d3748');
doc.restore();

// Sidebar Content
let yPos = 200;
const leftMargin = 20;
const sidebarContentWidth = sidebarWidth - 40;

// Contact Info
doc.font('Helvetica-Bold').fontSize(14).fillColor(sidebarTextColor)
   .text('CONTACT', leftMargin, yPos);
yPos += 20;

doc.font('Helvetica').fontSize(10).fillColor('#cbd5e0');
doc.text('Email:', leftMargin, yPos);
doc.fillColor(sidebarTextColor).text('tamanna.shar12@gmail.com', leftMargin, yPos + 12, { width: sidebarContentWidth });
yPos += 40;

doc.fillColor('#cbd5e0').text('LinkedIn:', leftMargin, yPos);
doc.fillColor(sidebarTextColor).text('linkedin.com/in/tamanna2112', leftMargin, yPos + 12, { width: sidebarContentWidth });
yPos += 40;

doc.fillColor('#cbd5e0').text('GitHub:', leftMargin, yPos);
doc.fillColor(sidebarTextColor).text('github.com/tamannashar12', leftMargin, yPos + 12, { width: sidebarContentWidth });
yPos += 50;

// Skills
doc.font('Helvetica-Bold').fontSize(14).fillColor(sidebarTextColor)
   .text('SKILLS', leftMargin, yPos);
yPos += 20;

const skills = ['Figma', 'Adobe XD', 'Photoshop', 'Canva', 'Prototyping', 'Wireframing', 'User Research', 'HTML/CSS'];

doc.font('Helvetica').fontSize(10).fillColor(sidebarTextColor);
skills.forEach(skill => {
    doc.text(`• ${skill}`, leftMargin, yPos);
    yPos += 15;
});
yPos += 30;

// Education (Placeholder)
doc.font('Helvetica-Bold').fontSize(14).fillColor(sidebarTextColor)
   .text('EDUCATION', leftMargin, yPos);
yPos += 20;

doc.font('Helvetica-Bold').fontSize(11).text('Bachelor of Design', leftMargin, yPos);
doc.font('Helvetica').fontSize(10).text('University of Design', leftMargin, yPos + 15);
doc.text('2018 - 2022', leftMargin, yPos + 30);


// --- Main Content ---
const mainLeftMargin = sidebarWidth + 40;
const mainContentWidth = pageWidth - sidebarWidth - 80;
let mainY = 60;

// Header
doc.font('Helvetica-Bold').fontSize(36).fillColor(mainTextColor)
   .text('TAMANNA', mainLeftMargin, mainY);
mainY += 40;

doc.font('Helvetica').fontSize(16).fillColor(accentColor)
   .text('UI/UX DESIGNER', mainLeftMargin, mainY, { characterSpacing: 2 });
mainY += 40;

// Profile
doc.font('Helvetica-Bold').fontSize(14).fillColor(mainTextColor)
   .text('PROFILE', mainLeftMargin, mainY);
doc.rect(mainLeftMargin, mainY + 18, 30, 3).fill(accentColor); // Underline
mainY += 35;

doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff. Passionate about creating intuitive interfaces that solve real problems.', mainLeftMargin, mainY, { width: mainContentWidth, align: 'justify' });
mainY += 60;

// Experience
doc.font('Helvetica-Bold').fontSize(14).fillColor(mainTextColor)
   .text('EXPERIENCE', mainLeftMargin, mainY);
doc.rect(mainLeftMargin, mainY + 18, 30, 3).fill(accentColor);
mainY += 35;

// Job 1
doc.font('Helvetica-Bold').fontSize(12).text('Senior UI/UX Designer', mainLeftMargin, mainY);
doc.font('Helvetica').fontSize(10).fillColor('#718096').text('Creative Agency | 2023 - Present', mainLeftMargin, mainY + 15);
mainY += 30;
doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('• Led the redesign of multiple e-commerce platforms, improving conversion rates by 15%.', mainLeftMargin, mainY, { width: mainContentWidth });
mainY += 15;
doc.text('• Collaborated with developers to ensure pixel-perfect implementation of designs.', mainLeftMargin, mainY, { width: mainContentWidth });
mainY += 15;
doc.text('• Conducted user research and usability testing to inform design decisions.', mainLeftMargin, mainY, { width: mainContentWidth });
mainY += 30;

// Job 2
doc.font('Helvetica-Bold').fontSize(12).fillColor(mainTextColor).text('UI Designer', mainLeftMargin, mainY);
doc.font('Helvetica').fontSize(10).fillColor('#718096').text('Tech Startup | 2021 - 2023', mainLeftMargin, mainY + 15);
mainY += 30;
doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('• Designed mobile app interfaces for iOS and Android platforms.', mainLeftMargin, mainY, { width: mainContentWidth });
mainY += 15;
doc.text('• Created wireframes, prototypes, and high-fidelity mockups.', mainLeftMargin, mainY, { width: mainContentWidth });
mainY += 30;

// Projects
mainY += 20;
doc.font('Helvetica-Bold').fontSize(14).fillColor(mainTextColor)
   .text('KEY PROJECTS', mainLeftMargin, mainY);
doc.rect(mainLeftMargin, mainY + 18, 30, 3).fill(accentColor);
mainY += 35;

// Project 1
doc.font('Helvetica-Bold').fontSize(11).text('E-commerce UX Redesign', mainLeftMargin, mainY);
doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('Improved checkout flow and product discovery for a mid-size retailer.', mainLeftMargin, mainY + 15, { width: mainContentWidth });
mainY += 35;

// Project 2
doc.font('Helvetica-Bold').fontSize(11).fillColor(mainTextColor).text('Mobile App Onboarding', mainLeftMargin, mainY);
doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('Crafted onboarding flows that increased activation rate by 24%.', mainLeftMargin, mainY + 15, { width: mainContentWidth });
mainY += 35;

// Project 3
doc.font('Helvetica-Bold').fontSize(11).fillColor(mainTextColor).text('Design System', mainLeftMargin, mainY);
doc.font('Helvetica').fontSize(10).fillColor('#4a5568')
   .text('Built a scalable design system for consistent cross-product UI.', mainLeftMargin, mainY + 15, { width: mainContentWidth });


// Finalize PDF file
doc.end();

console.log('Resume generated at ' + outputPath);
