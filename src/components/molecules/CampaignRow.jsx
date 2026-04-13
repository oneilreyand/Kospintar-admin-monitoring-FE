import StatusBadge from '../atoms/StatusBadge';

function CampaignRow({ campaign }) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="px-4 py-4">
        <div>
          <p className="font-semibold text-slate-900">{campaign.name}</p>
          <p className="text-sm text-slate-500">{campaign.channel}</p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium text-slate-700">{campaign.spend}</td>
      <td className="px-4 py-4 text-sm text-slate-600">{campaign.leads}</td>
      <td className="px-4 py-4">
        <StatusBadge tone={campaign.roiTone}>{campaign.roi}</StatusBadge>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{campaign.cvr}</td>
    </tr>
  );
}

export default CampaignRow;
