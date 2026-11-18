const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 32, left: 38, right: 38 },
  autoFirstPage: true
});

const pdfPath = path.join(publicDir, 'Kirthana_P_Resume.pdf');
const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor('#111827').text('KIRTHANA P', { align: 'center' });
doc.moveDown(0.15);

doc.fontSize(9.5).font('Helvetica').fillColor('#374151');
doc.text('Phone: +91 9789581789   |   Email: kirthikirthana14@gmail.com   |   LinkedIn   |   Portfolio', {
  align: 'center',
  link: 'https://www.linkedin.com/in/kirthana-p-4282b9304/'
});
doc.moveDown(0.3);

function drawSectionHeader(title) {
  doc.moveDown(0.25);
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#0f172a').text(title.toUpperCase());
  const y = doc.y + 2;
  doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(38, y).lineTo(557, y).stroke();
  doc.moveDown(0.35);
}

// Professional Summary
drawSectionHeader('Professional Summary');
doc.fontSize(9).font('Helvetica').fillColor('#334155').text(
  'Aspiring Data Scientist and Software & Immersive Developer with hands-on experience in data analysis, machine learning, visualization, and AI-driven content creation. Skilled in Python, AI prompt engineering, and creating AI-generated images, videos, and advertising creatives using GPT, Gemini, Veo, Kling, Seedance, and Wan. Experienced in developing creative prompts for engaging visual content and applying AI-driven solutions to real-world projects. Passionate about AI, immersive technologies, and creative digital content.',
  { lineGap: 1.5 }
);
doc.moveDown(0.35);

// Work Experience
drawSectionHeader('Work Experience');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Digifox Studio', { continued: true });
doc.font('Helvetica').fillColor('#475569').text(' — Software & Immersive Developer   |   May 2026 – Present');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Developing immersive simulation systems, interactive applications, and real-time backend integrations.', { lineGap: 1.2 });
doc.text('  • Designing data-driven interfaces and intelligent systems tailored for user engagement and precision.', { lineGap: 1.2 });
doc.text('  • Developed and refined prompts for AI media generation tools including GPT, Gemini, Veo, Kling, Seedance, and Wan to produce engaging visual content and advertisements.', { lineGap: 1.2 });
doc.text('  • Created AI-generated images, videos, and advertising creatives using detailed prompts tailored to campaign and content requirements.', { lineGap: 1.2 });
doc.moveDown(0.35);

// Projects
drawSectionHeader('Projects');

// Project 1
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Immersive CPR Training System');
doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#475569').text('Tools & Technologies: Unity 3D, C#, 3D Models, Animations.');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Developed an interactive CPR training simulation with realistic scenarios and user interactions.');
doc.text('  • Implemented C# scripting for training logic, timed CPR sequences, and real-time performance feedback.');
doc.moveDown(0.25);

// Project 2
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Credit Rating Classification');
doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#475569').text('Tools & Technologies: Python, Pandas, scikit-learn (Logistic Regression, Random Forest), XGBoost, SMOTE.');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Used German Credit dataset to predict customer creditworthiness; addressed class imbalance using SMOTE.');
doc.text('  • Applied Logistic Regression, Random Forest, and XGBoost models. Best accuracy achieved: ~84% with ROC-AUC evaluation.');
doc.moveDown(0.25);

// Project 3
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Fraud Detection');
doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#475569').text('Tools & Technologies: Python, Pandas, scikit-learn, Logistic Regression.');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Built logistic regression model to detect fraudulent transactions.');
doc.text('  • Performed EDA and applied feature encoding techniques. Evaluated performance using confusion matrix, precision, recall, and F1-score.');
doc.moveDown(0.35);

// Technical Skills
drawSectionHeader('Technical Skills');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Languages & Cloud: Python, Java, SQL, AWS');
doc.text('  • Tools & Libraries: Power BI, Tableau, MS Excel, NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn');
doc.text('  • Reporting & Version Control: PowerPoint, Tableau Storyboards, Google Slides, Git, GitHub');
doc.text('  • Design & Creative: Figma, Canva');
doc.text('  • AI Media: GPT & Gemini Image Model Prompts, Veo, Kling, Seedance, Wan Video Prompts, AI Image & Video Generation, Advertising Creatives');
doc.moveDown(0.35);

// Education
drawSectionHeader('Education');
doc.fontSize(9).font('Helvetica-Bold').fillColor('#1e293b').text('Bachelor of Engineering (B.E.) - Computer Science and Engineering', { continued: true });
doc.font('Helvetica').fillColor('#475569').text('   [ July 2021 – June 2025 ]');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155').text('CK College of Engineering and Technology   |   CGPA: 7.93');
doc.moveDown(0.15);

doc.fontSize(9).font('Helvetica-Bold').fillColor('#1e293b').text('Higher Secondary (12th Grade)', { continued: true });
doc.font('Helvetica').fillColor('#475569').text('   [ July 2020 – May 2021 ]');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155').text('Government Girls Higher Secondary School   |   Percentage: 85%');
doc.moveDown(0.15);

doc.fontSize(9).font('Helvetica-Bold').fillColor('#1e293b').text('Secondary School (10th Grade)', { continued: true });
doc.font('Helvetica').fillColor('#475569').text('   [ July 2018 – May 2019 ]');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155').text('Government Girls Higher Secondary School   |   Percentage: 84%');
doc.moveDown(0.35);

// Internships
drawSectionHeader('Internships');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('  • Completed 6 months internship at Netzwerk academy about data science.');
doc.text('  • Completed a 1-month internship at Cavin InfoTech about Unity Development.');
doc.text('  • Completed a 14-day internship in Syscorp Technologies about WebSite Development.');
doc.text('  • Completed internship on BlockChain Technology & 1-month internship at Fintech Point about Front end Development.');
doc.moveDown(0.35);

// Soft Skills
drawSectionHeader('Soft Skills');
doc.fontSize(8.8).font('Helvetica').fillColor('#334155');
doc.text('Problem solving   |   Adaptability   |   Time management');

doc.end();

stream.on('finish', () => {
  console.log('Successfully generated public/Kirthana_P_Resume.pdf with latest comprehensive resume content');
});
