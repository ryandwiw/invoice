import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Monitor } from 'lucide-react';
import AppearanceTabs from '@/components/appearance-tabs';

export default function Appearance() {
  return (
    <AppLayout>
      <SettingsLayout>
        <div className="p-6 space-y-4 rounded-lg bg-base-100 ">
          {/* Judul dengan ikon */}
          <h2 className="flex items-center gap-2 text-lg font-semibold card-title">
            <Monitor className="w-5 h-5 text-blue-600" />
            Appearance Settings
          </h2>

          {/* Deskripsi singkat */}
          <p className="text-sm">
            Choose your preferred theme for the application.
          </p>

          {/* Tabs utama */}
          <AppearanceTabs />

        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
