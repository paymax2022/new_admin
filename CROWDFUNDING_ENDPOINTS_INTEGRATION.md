# Crowdfunding API Integration

Quick reference for what's connected and what's missing.

## ✅ Connected Pages

### Dashboard
- `GET /admin/statistics` - Platform stats
- `GET /admin/campaigns` - Recent campaigns

### Campaigns
- `GET /admin/campaigns` - List campaigns
- `GET /admin/campaigns/:id` - Campaign details
- `PATCH /admin/campaigns/:id/status` - Approve/reject/suspend
- `DELETE /admin/campaigns/:id` - Delete campaign
- `GET /campaign/:id/donations` - Donations list
- `GET /campaign/:id/reviews` - Reviews list
- `GET /campaign/:id/activity` - Activity timeline

### Wallet
- `GET /admin/donations` - All donations

### Promotion
- `GET /campaign/boost/rates` - Boost pricing
- `POST /campaign/:id/boost` - Boost campaign (not wired up yet)

## ❌ Missing Endpoints

### Users
Need endpoints for:
- List users
- User details
- User actions (ban/suspend)

### Support
Need endpoints for:
- List tickets
- Ticket details
- Update ticket status

### Admin Users
Need endpoints for:
- List admins
- Create/edit admin
- Admin permissions

### Settings
Need endpoints for:
- Get platform settings
- Update settings

## API Config
- Base: `https://all-in-one-w69p.onrender.com/api/v1/crowdfunding`
- Auth: Bearer token (auto-handled)

## Notes
- All pages fall back to dummy data if API fails
- Errors show toast notifications
- Service file: `src/services/crowdfundingService.ts`
