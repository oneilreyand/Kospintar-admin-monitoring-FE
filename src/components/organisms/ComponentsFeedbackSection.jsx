import React, { useState } from 'react';
import Alert from '../atoms/Alert';
import Badge from '../atoms/Badge';
import Modal from '../atoms/Modal';
import Spinner from '../atoms/Spinner';
import ProgressBar from '../atoms/ProgressBar';
import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';

const ComponentsFeedbackSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const alertCode = `<Alert 
  type="success" 
  title="Success Message" 
  message="Your profile has been updated successfully." 
/>`;

  const badgeCode = `<Badge color="blue">Primary</Badge>
<Badge color="cyan" variant="outline">Success</Badge>
<Badge color="yellow" variant="light">Warning</Badge>`;

  const modalCode = `<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Example Modal"
>
  <p>Modal content goes here...</p>
</Modal>`;

  const progressCode = `<ProgressBar value={75} tone="bg-indigo-600" />
<Spinner size="w-8 h-8" />`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Feedback & Status</h2>
        <p className="mt-2 text-sm text-slate-500">Components for status, notifications, and progress tracking.</p>
      </section>

      <ComponentShowcaseItem
        title="Alerts"
        summary="Use Alerts to provide feedback on user actions or system status. Supports success, info, warning, and error types."
        code={alertCode}
        preview={(
          <div className="grid gap-4 lg:grid-cols-2 w-full">
            <Alert type="success" title="Success" message="Updated successfully." />
            <Alert type="info" title="Info" message="New updates available." />
            <Alert type="warning" title="Warning" message="Irreversible action." />
            <Alert type="error" title="Error" message="Connection failed." />
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Badges"
        summary="Badges are used to highlight status or categories. Supports Solid, Outline, and Light variants."
        code={badgeCode}
        preview={(
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400">Solid</p>
              <div className="flex gap-2"><Badge color="blue">Blue</Badge><Badge color="cyan">Green</Badge><Badge color="red">Red</Badge></div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400">Outline</p>
              <div className="flex gap-2"><Badge color="blue" variant="outline">Blue</Badge><Badge color="cyan" variant="outline">Green</Badge><Badge color="red" variant="outline">Red</Badge></div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400">Light</p>
              <div className="flex gap-2"><Badge color="blue" variant="light">Blue</Badge><Badge color="cyan" variant="light">Green</Badge><Badge color="red" variant="light">Red</Badge></div>
            </div>
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Progress & Spinners"
        summary="Indicators for loading states and task completion."
        code={progressCode}
        preview={(
          <div className="grid gap-8 lg:grid-cols-2 w-full">
            <div className="space-y-4">
              <ProgressBar value={75} tone="bg-indigo-600" />
              <ProgressBar value={40} tone="bg-emerald-500" />
            </div>
            <div className="flex items-center gap-6">
              <Spinner />
              <div className="text-indigo-600"><Spinner /></div>
              <div className="scale-150"><Spinner /></div>
            </div>
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Modals & Interactivity"
        summary="Dialogs and elements that require user attention or interaction."
        code={modalCode}
        preview={(
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 transition-all active:scale-95"
            >
              Open Modal Dialog
            </button>
            <button className="group relative rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Hover for Tooltip
              <div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 scale-0 rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white transition-all group-hover:scale-100">
                TailAdmin Tooltip!
                <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
              </div>
            </button>
          </div>
        )}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="TailAdmin Modal"
        footer={(
          <button 
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Got it, thanks!
          </button>
        )}
      >
        <p className="text-slate-600">
          This is a replicated modal component. It supports custom footers, headers, and backdrop blurring.
        </p>
      </Modal>
    </div>
  );
};

export default ComponentsFeedbackSection;

