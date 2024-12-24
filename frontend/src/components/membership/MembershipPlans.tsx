import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { toast } from '../../lib/use-toast';
import { useAuth } from '../../contexts/AuthContext';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Basic features for personal use',
    features: [
      'Basic magnet link parsing',
      'Limited streaming quality',
      'No offline downloads',
      'Basic support',
    ],
    buttonText: 'Current Plan',
    type: 'FREE',
  },
  {
    name: 'Basic',
    price: '$9.99',
    description: 'Everything you need for regular use',
    features: [
      'Advanced magnet link parsing',
      'HD streaming quality',
      'Limited offline downloads',
      'Priority support',
    ],
    buttonText: 'Upgrade to Basic',
    type: 'BASIC',
  },
  {
    name: 'Premium',
    price: '$19.99',
    description: 'Best for power users',
    features: [
      'Premium magnet link parsing',
      '4K streaming quality',
      'Unlimited offline downloads',
      '24/7 premium support',
      'Cross-device sync',
    ],
    buttonText: 'Upgrade to Premium',
    type: 'PREMIUM',
  },
];

const MembershipPlans: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = async (planType: string) => {
    try {
      // TODO: Implement subscription logic
      toast({
        title: 'Subscription Updated',
        description: `Successfully upgraded to ${planType} plan.`,
      });
      navigate('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update subscription. Please try again.',
      });
    }
  };

export default MembershipPlans;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the perfect plan for your needs
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                /month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {plan.description}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.type === user?.membership_type ? 'secondary' : 'default'}
                disabled={plan.type === user?.membership_type}
                onClick={() => handleUpgrade(plan.type)}
              >
                {plan.type === user?.membership_type ? 'Current Plan' : plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
