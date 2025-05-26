import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface PublishButtonProps {
  onClick: () => void;
}

const PublishButton: React.FC<PublishButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="发布信息" placement="left">
      <Fab
        color="primary"
        aria-label="发布信息"
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#222',
          '&:hover': {
            bgcolor: '#FF8CB3'
          }
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default PublishButton; 