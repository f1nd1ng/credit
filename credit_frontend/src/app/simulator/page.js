'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { baseURL } from '@/utils/api';

const Container1 = styled.div`
  font-family: 'Open Sans Hebrew Condensed', sans-serif;
  background: white;
  color: #123524;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ScoreCard = styled.div`
  background: white;
  border: 1px solid green;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 400px;
  text-align: center;
  margin-top: 40px;
`;

const ScoreText = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #123524;
`;

const ScoreValue = styled.h1`
  font-size: 80px;
  font-weight: bold;
  margin: 10px 0;
`;

const IncreaseText = styled.p`
  font-size: 18px;
  color: #145c3a;
  font-weight: bold;
`;

const ScoreRangeContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: center;
`;

const ScoreRangeTitle = styled.h3`
  font-size: 23px;
  text-align: left;
  font-weight: bold;
  color: #228B22;
`;

const ScoreBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const ScoreBlock = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  font-size: 18px;
  border-radius: 2px;
  color: white;
  height: 25px;
`;

const ScoreLabel = styled.div`
  text-align: center;
  font-family: 'Open Sans Hebrew Condensed', sans-serif;
  margin-top: 9px;
  font-size: 18px;
  font-weight: bold;
`;

const scoreColors = {
  poor: "#89C6B7",
  fair: "#2E8B57",
  good: "#174D61",
  excellent: "#145c3a",
}
const Container = styled.div`
  font-family: 'Open Sans Hebrew Condensed', sans-serif;
  background: #fff;
  color: #123524;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  background: #0f3d2e;
  padding: 15px 30px;
  color: white;
  font-size: 20px;
`;

const Navbar1 = styled.div`
  background: #0f3d2e;
  padding: 20px 30px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 6rem;
  color: #1C4332;
  margin: 30px 10px;
`;

const PrimarySubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 100;
  text-align: center;
  max-width: 70vw;
  margin: auto;
`;

const SecondarySubtitle = styled.p`
    font-size: 17px;
    text-align: left;
    color: grey;
    font-family: 'Open Sans Hebrew Condensed', sans-serif;

`
const Button1 = styled.button`
  display: block;
  font-weight: bold;
  padding: 10px 11px;
  background: white;
  color: dark-green;
  border: none;
  border-radius: 20px;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    background: #145c3a;
  }
`;

const Button = styled.button`
  display: block;
  margin: 30px auto 40px auto;
  padding: 18px 20px;
  background: #0f3d2e;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    background: #145c3a;
  }
`;

const FormGroup = styled.div`
  margin: 20px auto 20px auto;
  max-width: 900px;
`;
const Logo = styled.div`
    font-size: 30px;
`;
const Label = styled.label`
  font-size: 2.5rem;
  display: block;
  font-weight: 500;
  margin-bottom: 20px;
  color: #055049;
`;

const SecondaryLabel = styled.label`
  font-size: 20px;
  display: block;
  font-weight: bold;
  color: #2E8B57;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid green;
  border-radius: 5px;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  color: grey;
  font-family: 'Open Sans Hebrew Condensed', sans-serif;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  border: 1px solid green;
  border-radius: 5px;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  color: grey;
  font-family: 'Open Sans Hebrew Condensed', sans-serif;
`;

export default function CreditScoreSimulator() {
  const [formData, setFormData] = useState({
    emi_payment: 'On-Time',
    credit_usage: '',
    credit_limit: '',
    num_credit_cards: '',
    credit_mix: 'Balanced',
    hard_inquiries: '',
    credit_history_years: '',
    monthly_debt: '',
    monthly_income: '',
  });

  const [creditScore, setCreditScore] = useState(null);
  const router = useRouter();
  
    useEffect(() => {
        
        const token = localStorage.getItem("access_token");
        //Redirect after user login
        if (!token) {
          router.push("/login?next=/simulator");
          return;
        }
      },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token"); 
  
    if (!token) {
      console.error("No access token found. Please log in.");
      return;
    }
  
    const response = await fetch(baseURL("/simulator/api/credit_score_simulation/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      setCreditScore(data.credit_score);
    } else {
      console.error("Error:", data);
    }
  };
  

  return (
    <div style={{ height: '100vh',bgcolor: ' #DBDBDB', paddingTop: '12vh', overflowY: 'auto', fontFamily: "'Open Sans Hebrew Condensed', sans-serif;"}}>
        
        <Title>Credit Score Simulator</Title>
        <PrimarySubtitle>
          A good credit score opens doors to better financial opportunities! Use our simulator
          to understand what influences your score and make informed choices for a brighter financial future!
        </PrimarySubtitle>
        <img src="utils/simulator_page.png" 
        alt="Credit Score Illustration" 
        style={{ display: "block", margin: "20px auto", maxWidth: "50vw", height: "auto" }} 
/>
        <Button>Start Simulating</Button>
        <Navbar1></Navbar1>

      <form onSubmit={handleSubmit} >
        <FormGroup>
          <Label>EMI Payments</Label>
          <SecondarySubtitle>
              Making EMI payments on time positively impacts your credit score by demonstrating responsible credit
              behaviour, improving payment history, and boosting lender trust. On the other hand, delayed EMI payments can 
              lower your score, incur late payment fees, and reduce creditworthiness, making it harder to secure future loans
              or credit cards.
          </SecondarySubtitle>
          <Select name="emi_payment" value={formData.emi_payment} onChange={handleChange}>
            <option value="" disabled >Select</option>
            <option>On-Time</option>
            <option>Delayed</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Credit Utilization Ratio</Label>
          <SecondarySubtitle>
          The credit utilization ratio is the percentage of your available credit that you are currently using, and it
          plays a crucial role in determining your credit score. A low utilisation ratio (below 30%) signals responsible
          credit usage and helps improve your score, while a high ratio can negatively impact it by indicating a higher
          reliance on credit. Keeping your utilisation low and making timely payments can positively influence your 
          creditworthiness.
          </SecondarySubtitle>
        </FormGroup>

        <FormGroup>
          <SecondaryLabel>Credit Usage</SecondaryLabel>
          <Input type="number"
                 name="credit_usage"
                  value={formData.credit_usage}
                  onChange={handleChange}
                  placeholder="Enter credit usage"
            />
        </FormGroup>
        
        <FormGroup>
          <SecondaryLabel>Total Credit Limit</SecondaryLabel>
          <Input type="number"
                      name="credit_limit"
                      value={formData.credit_limit}
                      onChange={handleChange}
                      placeholder="Enter total credit limit" />
        </FormGroup>

         <FormGroup>
          <Label>Number of Credit Cards</Label>
          <SecondarySubtitle>
          The number of credit cards affects your score by influencing your credit limit and utilisation ratio. 
          More cards can improve your score if managed well, but too many new accounts may lower your average account
           age and add hard inquiries, potentially harming your score.
          </SecondarySubtitle>
          <Input type="number"
                      name="num_credit_cards"
                      value={formData.num_credit_cards}
                      onChange={handleChange}
                      placeholder="Enter number of credit cards" />
        </FormGroup>

        <FormGroup>
          <Label>Credit Mix</Label>
          <SecondarySubtitle>
          Credit mix refers to the variety of credit accounts you have, such as credit cards, loans, and mortgages.
          A balanced mix shows responsible credit management and can boost your score, while relying too much on one
          type may have a limited positive impact.
          </SecondarySubtitle>
          <Select name="credit_mix" value={formData.credit_mix} onChange={handleChange}>
          <option value="" disabled >Select</option>
            <option>Balanced</option>
            <option>Unbalanced</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Hard Inquiries</Label>
          <SecondarySubtitle>
              Hard inquires occur when lenders review your credit report for new credit applications. While a few inquires
              are normal, multiple hard inquires in a short period can lower the score, as they indicate multiple 
              financial stress or increased credit risk. 
          </SecondarySubtitle>
          <Input   type="number"
                      name="hard_inquiries"
                      value={formData.hard_inquiries}
                      onChange={handleChange}
                      placeholder="Enter number of hard inquiries" />
        </FormGroup>
        
        <FormGroup>
          <Label>Credit History (yrs)</Label>
          <SecondarySubtitle>
          Credit history length reflects how long you've managed credit accounts. 
          A longer credit history helps improve your score by showing consistent, responsible credit use.
          Shorter histories may lower scores due to limited credit experience.
          </SecondarySubtitle>
          <Input type="number"
                      name="credit_history_years"
                      value={formData.credit_history_years}
                      onChange={handleChange}
                      placeholder="Enter number of years" />
        </FormGroup>

       <FormGroup>
          <Label>Debt-to-Income Ratio</Label>
          <SecondarySubtitle>
          The debt-to-income (DTI) ratio measures how much of your monthly income goes toward paying debts. 
          A lower DTI indicates better financial stability and positively impacts your credit score, while a high DTI suggests
          a risk of overborrowing, potentially lowering your score. It requires information on total monthly debt payments and
          total monthly income to calculate the percentage of income used for debt repayment.
          </SecondarySubtitle>
          </FormGroup>

          <FormGroup>
          <SecondaryLabel>Monthly Debt</SecondaryLabel>
          <Input   type="number"
                      name="monthly_debt"
                      value={formData.monthly_debt}
                      onChange={handleChange}
                      placeholder="Monthly Debt" />
          </FormGroup>

          <FormGroup>
          <SecondaryLabel>Monthly Income</SecondaryLabel>
          <Input  type="number"
                      name="monthly_income"
                      value={formData.monthly_income}
                      onChange={handleChange}
                      placeholder="Monthly Income" style={{ marginTop: '10px' }} />
          </FormGroup>
          
          <Button type="submit">Simulate Score</Button>

      </form>
{
      <Container1>
        <ScoreCard>
          <ScoreText>Your Simulated Score is</ScoreText>
          <ScoreValue>{creditScore}</ScoreValue>
          <ScoreRangeContainer>
            <ScoreRangeTitle>Understand Credit Score:</ScoreRangeTitle>
            <ScoreBar>
              <ScoreBlock style={{ background: scoreColors.poor }}>300-549</ScoreBlock>
              <ScoreBlock style={{ background: scoreColors.fair }}>550-649</ScoreBlock>
              <ScoreBlock style={{ background: scoreColors.good }}>650-749</ScoreBlock>
              <ScoreBlock style={{ background: scoreColors.excellent }}>750-900</ScoreBlock>
            </ScoreBar>
  
            <ScoreBar>
              <ScoreLabel>Poor</ScoreLabel>
              <ScoreLabel>Fair</ScoreLabel>
              <ScoreLabel>Good</ScoreLabel>
              <ScoreLabel>Excellent</ScoreLabel>
            </ScoreBar>
          </ScoreRangeContainer>
        </ScoreCard>
        </Container1>}
    </div>
  );
}
