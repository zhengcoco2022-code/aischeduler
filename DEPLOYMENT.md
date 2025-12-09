# SmartSchedule - Deployment Guide

## Deployment Options

### Option 1: Replit (Recommended - Already Configured)

The project is set up for Replit deployment out of the box.

#### Steps
1. Push to GitHub
2. Connect Replit to your GitHub repo
3. Set environment variables in Replit secrets
4. Click "Run" to start the application

#### Environment Variables (Replit Secrets)
```
DATABASE_URL=your_postgres_connection_string
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_key
AI_INTEGRATIONS_OPENAI_BASE_URL=your_openai_base_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BASE_URL=https://your-app.replit.dev
```

---

### Option 2: Vercel (Frontend Only)

For frontend-only deployment (requires separate backend).

#### Build Command
```bash
npm run build
```

#### Output Directory
```
dist
```

#### Environment Variables
Set in Vercel dashboard:
```
VITE_API_URL=https://your-api.example.com
```

---

### Option 3: Docker

Deploy the entire application in Docker.

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/smartschedule
      NODE_ENV: production
      AI_INTEGRATIONS_OPENAI_API_KEY: ${OPENAI_KEY}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: smartschedule
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  db_data:
```

#### Deploy
```bash
docker-compose up -d
```

---

### Option 4: Railway

#### Step 1: Connect GitHub
1. Go to railway.app
2. Connect your GitHub account
3. Select your repository

#### Step 2: Configure Environment
In Railway dashboard:
- Add DATABASE_URL
- Add all API keys
- Set NODE_ENV=production

#### Step 3: Deploy
- Railway auto-deploys on push
- View logs in dashboard
- Get production URL

---

### Option 5: Heroku

Heroku has deprecated free tier, but you can still deploy paid apps.

#### Procfile
```
web: npm start
release: npm run db:push
```

#### Deploy
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL=your_db_url
heroku config:set AI_INTEGRATIONS_OPENAI_API_KEY=your_key

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

### Option 6: AWS (ECS + RDS)

More complex setup for production scale.

#### Services Needed
- AWS EC2 or ECS for application
- RDS for PostgreSQL database
- S3 for file uploads
- CloudFront for CDN

#### Basic Setup
1. Create RDS PostgreSQL instance
2. Create ECS cluster
3. Push Docker image to ECR
4. Create ECS service
5. Configure load balancer
6. Set up CloudFront

---

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run check` - TypeScript type checking
- [ ] Run `npm run build` - Production build succeeds
- [ ] Test in production mode locally

### Environment
- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] OpenAI API key working
- [ ] Google OAuth credentials ready

### Database
- [ ] Database created
- [ ] Migrations run: `npm run db:push`
- [ ] Tables populated
- [ ] Backups configured

### Security
- [ ] HTTPS enabled
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Sensitive data in environment variables only
- [ ] API keys rotated before production

### Monitoring
- [ ] Error logging configured
- [ ] Uptime monitoring enabled
- [ ] Database backups automated
- [ ] Log aggregation set up
- [ ] Alerts configured

---

## Production Configuration

### Environment Variables
```env
# Application
NODE_ENV=production
BASE_URL=https://your-domain.com
PORT=5000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/smartschedule

# AI Services
AI_INTEGRATIONS_OPENAI_API_KEY=sk-...
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1

# Google Calendar
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Session
SESSION_SECRET=your-secret-key

# Logging
LOG_LEVEL=info

# Security
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Build Steps
```bash
# 1. Install dependencies
npm ci

# 2. Check types
npm run check

# 3. Build
npm run build

# 4. Run database migrations
npm run db:push

# 5. Start server
npm start
```

---

## Performance Optimization

### Frontend
```bash
# Bundle analysis
npm run build -- --analyze

# Results in dist/ with size report
```

### Database
```sql
-- Add indexes for common queries
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_scheduled_blocks_date ON scheduledBlocks(scheduledDate);
CREATE INDEX idx_classes_days ON classEntries(days);
```

### Caching
```typescript
// In API responses
res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
```

### Compression
Already configured in Express with:
```typescript
import compression from 'compression';
app.use(compression());
```

---

## Monitoring & Logging

### Setup Error Tracking
Example with Sentry:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

### Setup Health Check
```http
GET /health

Response:
{
  "status": "ok",
  "uptime": 3600,
  "database": "connected",
  "timestamp": "2024-01-02T10:00:00Z"
}
```

### Log Aggregation
Setup with ELK Stack or Datadog:
- Application logs
- Error logs
- Request logs
- Database queries

---

## Backup & Recovery

### Database Backups
```bash
# Automated daily backups (configure in your platform)
# Or manual backup:
pg_dump -h localhost -U user smartschedule > backup.sql

# Restore from backup:
psql -h localhost -U user smartschedule < backup.sql
```

### Data Export
All users can export their data:
1. Go to Export Schedule
2. Download as JSON
3. Keep local backup
4. Can import back anytime

---

## SSL/TLS Certificate

### Automatic (Let's Encrypt)
Most platforms (Replit, Railway, Vercel) handle this automatically.

### Manual Setup
```bash
# Using Certbot
certbot certonly --standalone -d your-domain.com

# Configure Nginx to use certificate
# Or configure in your platform's settings
```

---

## Scaling

### Horizontal Scaling
- Docker containers for app instances
- Load balancer (AWS ELB, Nginx)
- Shared PostgreSQL database
- Redis for session storage (optional)

### Database Scaling
- Read replicas for read-heavy workloads
- Connection pooling (PgBouncer)
- Archival of old data
- Index optimization

### Caching Layer
- Redis for session data
- CDN for static assets
- API response caching
- Query result caching

---

## Rollback Procedure

### If Deployment Fails
```bash
# Git rollback
git revert HEAD

# Database rollback (if schema changed)
npm run db:push  # Uses migrations

# Restart application
npm start
```

---

## Post-Deployment

### Verify Deployment
1. Test landing page loads
2. Test login flow
3. Test schedule upload
4. Test task creation
5. Test AI chat
6. Test export features
7. Test mobile responsiveness

### Monitor First 24 Hours
- Error logs
- Performance metrics
- User feedback
- Database performance
- API response times

---

## Troubleshooting

### App Won't Start
```bash
# Check logs
docker logs <container-id>

# Check environment
env | grep -E "DATABASE|API|GOOGLE"

# Verify database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Database Connection Issues
```bash
# Test connection
psql -h host -U user -d database

# Check connection string format
postgresql://user:password@host:5432/database

# Verify firewall rules
```

### Out of Memory
- Increase container memory limit
- Check for memory leaks in code
- Clear old logs
- Archive old data

### Slow Performance
- Check database indexes
- Review slow query logs
- Enable response caching
- Use CDN for static assets

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check uptime status
- Review performance metrics

### Weekly
- Update dependencies: `npm audit`
- Review database size
- Check backup integrity
- Monitor API metrics

### Monthly
- Major version updates (if stable)
- Database maintenance
- Cache clearing
- Security audit
- Cost optimization

### Quarterly
- Full security review
- Load testing
- Disaster recovery test
- Architecture review

---

## Disaster Recovery Plan

### Backup Strategy
- Daily automated backups
- Weekly full database dumps
- Monthly archived backups
- Off-site storage (S3, Google Cloud)
- Point-in-time recovery enabled

### Recovery Time Objective (RTO)
Target: < 1 hour

### Recovery Point Objective (RPO)
Target: < 1 hour of data

### Recovery Steps
1. Restore latest backup
2. Verify data integrity
3. Restart application
4. Run health checks
5. Notify users

---

## Cost Optimization

### Replit
- Auto-scales with usage
- Free tier available
- Pay-as-you-go pricing
- No unused resources

### Database
- Use managed database service
- Right-size instance
- Delete old data regularly
- Archive infrequently accessed data

### APIs
- Cache responses
- Batch requests
- Use free tier limits
- Monitor usage

---

## Security Hardening

### Application
- HTTPS only
- Secure headers (HSTS, CSP)
- CSRF protection
- Input validation
- Rate limiting
- SQL injection prevention (ORM)

### Database
- Encrypted connections
- Strong passwords
- Minimal user permissions
- Backup encryption
- Audit logging

### Infrastructure
- Firewall rules
- DDoS protection
- WAF (Web Application Firewall)
- Regular security updates

---

## Version Management

### Semantic Versioning
```
1.0.0
│ │ │
│ │ └─ Patch (bug fixes)
│ └───── Minor (new features)
└─────── Major (breaking changes)
```

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Tag release in Git
- [ ] Create release notes
- [ ] Test in staging environment
- [ ] Deploy to production
- [ ] Monitor for issues

---

## Documentation

- Keep README.md updated
- Document configuration
- Document deployment process
- Create runbooks for common tasks
- Document troubleshooting steps

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀
