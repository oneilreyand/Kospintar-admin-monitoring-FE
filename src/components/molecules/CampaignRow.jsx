import StatusBadge from '../atoms/StatusBadge';

function CampaignRow({ campaign }) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-4">
        <div>
          <p className="font-semibold text-navy">{campaign.name}</p>
          <p className="text-sm text-text-secondary">{campaign.channel}</p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium text-navy">{campaign.spend}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">{campaign.leads}</td>
      <td className="px-4 py-4">
        <StatusBadge tone={campaign.roiTone}>{campaign.roi}</StatusBadge>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">{campaign.cvr}</td>
    </tr>
  );
}

export default CampaignRow;
