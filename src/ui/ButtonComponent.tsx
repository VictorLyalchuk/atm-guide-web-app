import { Button } from '@mui/material';

interface ButtonComponent {
  onClick?: () => void;
  text?: string;
    type?: "button" | "submit" | "reset"; 
}

const CancelButton: React.FC<ButtonComponent> = ({ onClick, text = 'Кнопка', type = "button" }) => {
  return (
    <Button
      type={type}
      variant="contained"
      size="large"
      color="primary"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CancelButton;