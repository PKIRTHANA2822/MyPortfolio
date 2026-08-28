const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 36, left: 40, right: 40 }
});

const pdfPath = path.join(publicDir, 'Kirthana_P_Resume.pdf');
const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor('#111827').text('KIRTHANA P', { align: 'left' });
doc.moveDown(0.2);

doc.fontSize(9.5).font('Helvetica').fillColor('#374151');
doc.text('Email: kirthikirthana14@gmail.com   |   Phone: +91 9789581789   |   LinkedIn: linkedin.com/in/kirthana-p-4282b9304', {
  link: 'https://www.linkedin.com/in/kirthana-p-4282b9304/'
});
doc.moveDown(0.4);

// Summary
doc.fontSize(9.5).font('Helvetica').fillColor('#1f2937').text(
  'Aspiring Data Scientist with hands-on experience in data analysis, machine learning, and visualization. Skilled in Python and passionate about learning and applying AI-driven solutions.'
);
doc.moveDown(0.6);

function drawSectionHeader(title) {
  doc.moveDown(0.3);
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#0f172a').text(title.toUpperCase());
  const y = doc.y + 2;
  doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(40, y).lineTo(555, y).stroke();
  doc.moveDown(0.4);
}

// Projects
drawSectionHeader('Projects');

// Project 1
doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e293b').text('Immersive CPR Training System:');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Tools & Technologies: Unity 3D, C#, 3D Models, Animations.');
doc.text('  • Developed an interactive CPR training simulation with realistic scenarios and user interactions.');
doc.text('  • Implemented C# scripting for training logic, timed CPR sequences, and real-time performance feedback.');
doc.moveDown(0.3);

// Project 2
doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e293b').text('Credit Rating Classification:');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Tools & Technologies: Python, Pandas, scikit-learn (Logistic Regression, Random Forest), XGBoost, SMOTE.');
doc.text('  • Used German Credit dataset to predict customer creditworthiness.');
doc.text('  • Addressed class imbalance using SMOTE.');
doc.text('  • Applied Logistic Regression, Random Forest, and XGBoost models. Best accuracy achieved: ~84% with ROC-AUC evaluation.');
doc.moveDown(0.3);

// Project 3
doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e293b').text('Fraud Detection:');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Tools & Technologies: Python, Pandas, scikit-learn, Logistic Regression.');
doc.text('  • Built logistic regression model to detect fraudulent transactions.');
doc.text('  • Performed EDA and applied feature encoding techniques. Evaluated performance using confusion matrix, precision, recall, and F1-score.');
doc.moveDown(0.4);

// Education
drawSectionHeader('Education');
doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('B.E. Computer Science and Engineering', { continued: true });
doc.font('Helvetica').fillColor('#334155').text(' — CK College of Engineering and Technology   |   CGPA: 7.93  [ 2021 – 2025 ]');

doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Higher Secondary (12th Grade)', { continued: true });
doc.font('Helvetica').fillColor('#334155').text(' — Government Girls Higher Secondary School   |   Percentage: 85%  [ 2020 – 2021 ]');

doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1e293b').text('Secondary School (10th Grade)', { continued: true });
doc.font('Helvetica').fillColor('#334155').text(' — Government Girls Higher Secondary School   |   Percentage: 84%  [ 2018 – 2019 ]');
doc.moveDown(0.4);

// Internship
drawSectionHeader('Internships');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Completed 6 months internship at Netzwerk academy about data science.');
doc.text('  • Completed a 1-month internship at Cavin InfoTech about Unity Development.');
doc.text('  • Completed a 14-day internship in Syscorp Technologies about WebSite Development.');
doc.text('  • Completed internship on BlockChain Technology.');
doc.text('  • Completed a 1-month internship at Fintech Point about Front end Development.');
doc.moveDown(0.4);

// Technical Skills
drawSectionHeader('Technical Skills');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Languages: Python, Java, SQL.');
doc.text('  • Cloud Platform: AWS.');
doc.text('  • Tools: Power BI, Tableau, MS Excel.');
doc.text('  • Libraries: NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn.');
doc.text('  • Reporting & Presentation: PowerPoint, Tableau Storyboards, Google Slides.');
doc.text('  • Collaboration & Version Control: Git, GitHub.');
doc.moveDown(0.4);

// Soft Skills
drawSectionHeader('Soft Skills');
doc.fontSize(9).font('Helvetica').fillColor('#334155');
doc.text('  • Problem solving   |   Adaptability   |   Time management');

doc.end();

stream.on('finish', () => {
  console.log('Successfully generated public/Kirthana_P_Resume.pdf');
});
