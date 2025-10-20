import { SignUp } from '@clerk/nextjs';

import type { ReactElement } from 'react';

export default function Page(): ReactElement {
  return (
    <div className='flex items-center justify-center mt-16'>
      <SignUp />;
    </div>
  );
}
