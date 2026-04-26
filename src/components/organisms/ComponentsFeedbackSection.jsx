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

  const badgeCode = `<Badge color="green">Primary</Badge>
<Badge color="green" variant="outline">Success</Badge>
<Badge color="yellow" variant="light">Warning</Badge>`;

  const modalCode = `<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Example Modal"
>
  <p>Modal content goes here...</p>
</Modal>`;

  const progressCode = `<ProgressBar value={75} tone="bg-primary" />
<Spinner size="w-8 h-8" />`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-white px-6 py-6 shadow-sm">
        <h2 className="text-xl font-bold text-navy">Feedback & Status</h2>
        <p className="mt-2 text-sm text-text-secondary">Components for status, notifications, and progress tracking.</p>
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
              <p className="text-[10px] font-bold uppercase text-text-secondary">Solid</p>
              <div className="flex gap-2"><Badge color="green">Primary</Badge><Badge color="cyan">Success</Badge><Badge color="red">Danger</Badge></div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-text-secondary">Outline</p>
              <div className="flex gap-2"><Badge color="green" variant="outline">Primary</Badge><Badge color="cyan" variant="outline">Success</Badge><Badge color="red" variant="outline">Danger</Badge></div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-text-secondary">Light</p>
              <div className="flex gap-2"><Badge color="green" variant="light">Primary</Badge><Badge color="cyan" variant="light">Success</Badge><Badge color="red" variant="light">Danger</Badge></div>
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
              <ProgressBar value={75} tone="bg-primary" />
              <ProgressBar value={40} tone="bg-emerald-500" />
            </div>
            <div className="flex items-center gap-6">
              <Spinner />
              <div className="text-primary"><Spinner /></div>
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
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-600 active:scale-95"
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
            className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-brand-600"
          >
            Got it, thanks!
          </button>
        )}
      >
        <p className="text-navy">
          This is a replicated modal component. It supports custom footers, headers, and backdrop blurring.
        </p>
      </Modal>
    </div>
  );
};

export default ComponentsFeedbackSection;
