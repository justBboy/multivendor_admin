import React from 'react';
import VendorCreateUpdate from '../utils/VendorCreateUpdate';

interface VendorCreateProps{
    
}

const VendorCreate:React.FC<VendorCreateProps> = ({}) => {
    return (
         <VendorCreateUpdate create />
    )
}

export default VendorCreate;