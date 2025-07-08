let logs: any[] = [];

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json(logs);
  }

  if (req.method === 'POST') {
    const { action, listingId, performedBy } = req.body;
    logs.push({
      id: logs.length + 1,
      action,
      listingId,
      performedBy,
      timestamp: new Date().toISOString(),
    });
    return res.status(201).json({ success: true });
  }

  res.status(405).end();
}
