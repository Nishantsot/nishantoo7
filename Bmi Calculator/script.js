function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
  
    
  
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(2);
  
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
  
    document.getElementById('result').textContent = `Your BMI is ${bmiRounded} (${category})`;
  }

