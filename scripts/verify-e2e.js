const http = require('http')

async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        })
      })
    })

    req.on('error', (err) => reject(err))

    if (postData) {
      req.write(postData)
    }
    req.end()
  })
}

async function runTests() {
  console.log('===========================================================')
  console.log('   FOUR FRONT LAB — COMPREHENSIVE E2E VERIFICATION SUITE   ')
  console.log('===========================================================')
  let passed = 0
  let failed = 0

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`)
      passed++
    } else {
      console.error(`[FAIL] ${message}`)
      failed++
    }
  }

  try {
    // -------------------------------------------------------------
    // SECTION 1: PUBLIC PAGES & ASSETS
    // -------------------------------------------------------------
    console.log('\n--- Section 1: Public Routes & SEO Assets ---')

    // 1. Homepage
    const resHome = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    })
    assert(resHome.statusCode === 200, 'Homepage status 200')
    assert(resHome.body.includes('FOUR FRONT LAB'), 'Homepage contains official brand name')

    // 2. Services Index
    const resServices = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/services',
      method: 'GET',
    })
    assert(resServices.statusCode === 200, '/services status 200')

    // 3. Service Detail
    const resSrvDetail = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/services/website-development',
      method: 'GET',
    })
    assert(resSrvDetail.statusCode === 200, '/services/website-development status 200')

    // 4. Portfolio Index
    const resPortfolio = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/portfolio',
      method: 'GET',
    })
    assert(resPortfolio.statusCode === 200, '/portfolio status 200')

    // 5. Portfolio Detail
    const resCaseStudy = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/portfolio/aetheris-ai',
      method: 'GET',
    })
    assert(resCaseStudy.statusCode === 200, '/portfolio/aetheris-ai status 200')

    // 6. Contact Page
    const resContact = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/contact',
      method: 'GET',
    })
    assert(resContact.statusCode === 200, '/contact status 200')

    // 7. Robots.txt & Sitemap.xml
    const resRobots = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/robots.txt',
      method: 'GET',
    })
    assert(resRobots.statusCode === 200, '/robots.txt status 200')

    const resSitemap = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/sitemap.xml',
      method: 'GET',
    })
    assert(resSitemap.statusCode === 200, '/sitemap.xml status 200')

    // -------------------------------------------------------------
    // SECTION 2: SERVER-ENFORCED SECURITY ON UNAUTHENTICATED ADMIN
    // -------------------------------------------------------------
    console.log('\n--- Section 2: Server-Enforced Admin Route Protection ---')

    // 8. Unauthenticated /admin must redirect to /admin/login (status 307 or 302)
    const resAdminNoAuth = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET',
    })
    assert(
      resAdminNoAuth.statusCode === 307 || resAdminNoAuth.statusCode === 302,
      `Unauthenticated GET /admin redirected with status ${resAdminNoAuth.statusCode}`
    )
    assert(
      resAdminNoAuth.headers.location?.includes('/admin/login'),
      'Redirect location points to /admin/login'
    )

    // 9. Unauthenticated /admin/inquiries must redirect
    const resInquiriesNoAuth = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/admin/inquiries',
      method: 'GET',
    })
    assert(
      resInquiriesNoAuth.statusCode === 307 || resInquiriesNoAuth.statusCode === 302,
      `Unauthenticated GET /admin/inquiries redirected with status ${resInquiriesNoAuth.statusCode}`
    )

    // 10. Unauthenticated API endpoints reject with 401
    const resApiInqNoAuth = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/inquiries',
      method: 'GET',
    })
    assert(resApiInqNoAuth.statusCode === 401, 'Unauthenticated GET /api/inquiries rejected with 401')

    const resApiProjNoAuth = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/projects',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ title: 'Hacker Project' })
    )
    assert(resApiProjNoAuth.statusCode === 401, 'Unauthenticated POST /api/projects rejected with 401')

    const resApiCatNoAuth = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/categories',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ name: 'Hacker Cat' })
    )
    assert(resApiCatNoAuth.statusCode === 401, 'Unauthenticated POST /api/categories rejected with 401')

    // -------------------------------------------------------------
    // SECTION 3: INQUIRY FORM VALIDATION
    // -------------------------------------------------------------
    console.log('\n--- Section 3: Lead Ingestion & Input Validation ---')

    // 11. Reject missing fields
    const resInqEmpty = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/inquiries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ name: '', email: '', message: '' })
    )
    assert(resInqEmpty.statusCode === 400, 'Empty inquiry submission rejected with 400')

    // 12. Reject invalid email format
    const resInqBadEmail = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/inquiries',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      JSON.stringify({ name: 'Valid Name', email: 'invalid-email-string', message: 'Valid project message here' })
    )
    assert(resInqBadEmail.statusCode === 400, 'Invalid email format rejected with 400')

    // 13. Accept valid inquiry
    const validInquiry = JSON.stringify({
      name: 'Verification Executive',
      email: 'exec.verify@fourfrontlab.com',
      phone: '+14155559876',
      company: 'Quantum Dynamics Global',
      service: 'AI Solutions & Integrations',
      budget: '$50,000+',
      timeline: 'Immediate (< 2 weeks)',
      message: 'Automated test inquiry verifying complete CRM ingestion and data integrity.',
    })

    const resInquiry = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/inquiries',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(validInquiry),
        },
      },
      validInquiry
    )
    assert(resInquiry.statusCode === 201, 'Valid inquiry submitted with 201 Created')
    const inqData = JSON.parse(resInquiry.body)
    assert(inqData.success === true, 'Inquiry response success: true')
    const createdInquiryId = inqData.inquiry.id
    assert(Boolean(createdInquiryId), `Inquiry created with ID: ${createdInquiryId}`)

    // -------------------------------------------------------------
    // SECTION 4: AUTHENTICATION & SESSION HANDLING
    // -------------------------------------------------------------
    console.log('\n--- Section 4: Authentication & Session Verification ---')

    // 14. Invalid password rejected
    const badLoginPayload = JSON.stringify({
      email: 'admin@fourfrontlab.com',
      password: 'wrongpassword999',
    })
    const resBadLogin = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(badLoginPayload),
        },
      },
      badLoginPayload
    )
    assert(resBadLogin.statusCode === 401, 'Bad admin password rejected with 401')

    // 15. Valid login accepted with session cookie
    const loginPayload = JSON.stringify({
      email: 'admin@fourfrontlab.com',
      password: 'admin123456',
    })
    const resLogin = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(loginPayload),
        },
      },
      loginPayload
    )
    assert(resLogin.statusCode === 200, 'Valid admin login returned 200 OK')
    const setCookieHeader = resLogin.headers['set-cookie']
    assert(Boolean(setCookieHeader && setCookieHeader.length > 0), 'Session cookie returned in Set-Cookie header')
    const cookieVal = setCookieHeader[0].split(';')[0]

    // 16. Verify /api/auth/me returns active admin
    const resMe = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Cookie: cookieVal },
    })
    assert(resMe.statusCode === 200, 'GET /api/auth/me returns 200 with valid session')
    const meData = JSON.parse(resMe.body)
    assert(meData.user?.email === 'admin@fourfrontlab.com', 'Session belongs to admin@fourfrontlab.com')

    // 17. Authenticated GET /admin returns 200 OK
    const resAdminAuth = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET',
      headers: { Cookie: cookieVal },
    })
    assert(resAdminAuth.statusCode === 200, 'Authenticated GET /admin returns 200 OK')

    // -------------------------------------------------------------
    // SECTION 5: CRM PIPELINE & LEAD MANAGEMENT
    // -------------------------------------------------------------
    console.log('\n--- Section 5: CRM Operations & CSV Export ---')

    // 18. Authenticated inquiries listing contains our lead
    const resInquiriesList = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/inquiries',
      method: 'GET',
      headers: { Cookie: cookieVal },
    })
    assert(resInquiriesList.statusCode === 200, 'GET /api/inquiries returns 200')
    const inquiriesList = JSON.parse(resInquiriesList.body)
    const leadFound = inquiriesList.some((i) => i.id === createdInquiryId)
    assert(leadFound, 'Newly submitted inquiry is present in CRM leads')

    // 19. PATCH update status and notes
    const patchPayload = JSON.stringify({
      status: 'qualified',
      notes: 'Qualified during automated verification run.',
    })
    const resPatch = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: `/api/inquiries/${createdInquiryId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(patchPayload),
          Cookie: cookieVal,
        },
      },
      patchPayload
    )
    assert(resPatch.statusCode === 200, 'PATCH /api/inquiries/:id updates status to qualified')

    // 20. CSV Export contains lead
    const resExport = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/inquiries/export',
      method: 'GET',
      headers: { Cookie: cookieVal },
    })
    assert(resExport.statusCode === 200, 'GET /api/inquiries/export returns 200')
    assert(resExport.headers['content-type']?.includes('text/csv'), 'Export header is text/csv')
    assert(resExport.body.includes('Verification Executive'), 'Export CSV contains created lead name')

    // -------------------------------------------------------------
    // SECTION 6: CONFIGURABLE CATEGORIES & PORTFOLIO CMS
    // -------------------------------------------------------------
    console.log('\n--- Section 6: Configurable Categories & Project Management ---')

    // 21. Categories API listing
    const resCats = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/categories',
      method: 'GET',
    })
    assert(resCats.statusCode === 200, 'GET /api/categories returns 200')
    const catsList = JSON.parse(resCats.body)
    assert(catsList.length >= 5, `Categories list has at least 5 categories (${catsList.length} found)`)

    // 22. Create new category
    const newCatPayload = JSON.stringify({
      name: 'Automated Cloud Systems',
      slug: 'automated-cloud-systems',
      description: 'Distributed microservices and edge architectures.',
    })
    const resNewCat = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/categories',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(newCatPayload),
          Cookie: cookieVal,
        },
      },
      newCatPayload
    )
    assert(
      resNewCat.statusCode === 201 || resNewCat.statusCode === 409,
      `POST /api/categories responded with ${resNewCat.statusCode}`
    )

    // 23. Create new project with draft (published: false)
    const draftProjPayload = JSON.stringify({
      title: 'Secret NextGen Engine (Draft)',
      client: 'Apex Syndicate',
      industry: 'Defense & Aerospace',
      overview: 'Unpublished confidential prototype awaiting formal client signoff.',
      categoryId: catsList[0].id,
      published: false,
      featured: false,
      order: 99,
    })
    const resDraftProj = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/projects',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(draftProjPayload),
          Cookie: cookieVal,
        },
      },
      draftProjPayload
    )
    assert(resDraftProj.statusCode === 201, 'POST /api/projects creates draft project (201)')
    const draftProjData = JSON.parse(resDraftProj.body)
    const draftId = draftProjData.project.id
    const draftSlug = draftProjData.project.slug

    // 24. Public GET /api/projects does NOT include draft
    const resPublicProj = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/projects',
      method: 'GET',
    })
    const publicProjList = JSON.parse(resPublicProj.body)
    const draftFoundInPublic = publicProjList.some((p) => p.id === draftId)
    assert(!draftFoundInPublic, 'Draft project is NOT visible on public API')

    // 25. Admin GET /api/projects?all=true DOES include draft
    const resAdminProj = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/projects?all=true',
      method: 'GET',
      headers: { Cookie: cookieVal },
    })
    const adminProjList = JSON.parse(resAdminProj.body)
    const draftFoundInAdmin = adminProjList.some((p) => p.id === draftId)
    assert(draftFoundInAdmin, 'Draft project is visible to admin with ?all=true')

    // 26. Publish the project via PUT
    const publishPayload = JSON.stringify({ published: true, order: 10 })
    const resPublish = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: `/api/projects/${draftId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(publishPayload),
          Cookie: cookieVal,
        },
      },
      publishPayload
    )
    assert(resPublish.statusCode === 200, 'PUT /api/projects/:id successfully published project')

    // 27. Clean up test project via DELETE
    const resDelProj = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/projects/${draftId}`,
      method: 'DELETE',
      headers: { Cookie: cookieVal },
    })
    assert(resDelProj.statusCode === 200, 'DELETE /api/projects/:id deleted test project')

    // -------------------------------------------------------------
    // SECTION 7: MEDIA UPLOAD SECURITY
    // -------------------------------------------------------------
    console.log('\n--- Section 7: Media Security & Safe Uploads ---')

    // 28. Multipart boundary test - reject dangerous executable
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    const dangerousBody =
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="exploit.exe"\r\n` +
      `Content-Type: application/x-msdownload\r\n\r\n` +
      `MZ-executable-bytes\r\n` +
      `--${boundary}--\r\n`

    const resDangerousUpload = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/media',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(dangerousBody),
          Cookie: cookieVal,
        },
      },
      dangerousBody
    )
    assert(
      resDangerousUpload.statusCode === 400,
      'Dangerous file (.exe) rejected with 400 Bad Request'
    )

    // 29. Upload valid image asset
    const validImageBody =
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="test-badge.png"\r\n` +
      `Content-Type: image/png\r\n\r\n` +
      `\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\r\n` +
      `--${boundary}--\r\n`

    const resValidUpload = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/media',
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(validImageBody),
          Cookie: cookieVal,
        },
      },
      validImageBody
    )
    assert(resValidUpload.statusCode === 201, 'Valid PNG upload accepted with 201 Created')
    const mediaData = JSON.parse(resValidUpload.body)
    const uploadedAssetId = mediaData.asset?.id
    assert(Boolean(uploadedAssetId), `Uploaded media asset ID: ${uploadedAssetId}`)

    // 30. Clean up media asset via DELETE
    const resDelMedia = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/media?id=${uploadedAssetId}`,
      method: 'DELETE',
      headers: { Cookie: cookieVal },
    })
    assert(resDelMedia.statusCode === 200, 'DELETE /api/media cleans up asset and disk file')

    // -------------------------------------------------------------
    // SECTION 8: GLOBAL SETTINGS & WHATSAPP CONFIGURATION
    // -------------------------------------------------------------
    console.log('\n--- Section 8: Site Settings & WhatsApp Synchronization ---')

    // 31. GET /api/settings
    const resGetSettings = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/settings',
      method: 'GET',
    })
    assert(resGetSettings.statusCode === 200, 'GET /api/settings returns 200')
    const currentSettings = JSON.parse(resGetSettings.body)
    assert(Boolean(currentSettings.whatsapp_number), 'WhatsApp number present in settings')

    // 32. Update WhatsApp number via POST
    const newSettingsPayload = JSON.stringify({
      whatsapp_number: '+92 344 474 1603',
      whatsapp_raw: '+923444741603',
      contact_email: 'contact@fourfrontlab.com',
    })
    const resUpdateSettings = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/settings',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(newSettingsPayload),
          Cookie: cookieVal,
        },
      },
      newSettingsPayload
    )
    assert(resUpdateSettings.statusCode === 200, 'POST /api/settings updates settings successfully')

    // -------------------------------------------------------------
    // SECTION 9: LOGOUT & TERMINATION
    // -------------------------------------------------------------
    console.log('\n--- Section 9: Session Termination ---')

    // 33. POST /api/auth/logout clears session
    const resLogout = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/logout',
      method: 'POST',
      headers: { Cookie: cookieVal },
    })
    assert(resLogout.statusCode === 200, 'POST /api/auth/logout returns 200')

    // 34. Check /api/auth/me without cookie is unauthorized
    const resPostLogoutMe = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/me',
      method: 'GET',
    })
    assert(resPostLogoutMe.statusCode === 401, 'Subsequent request without session is 401 Unauthorized')

    console.log(`\n===========================================================`)
    console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`)
    console.log(`===========================================================`)

    if (failed > 0) {
      process.exit(1)
    } else {
      process.exit(0)
    }
  } catch (err) {
    console.error('Fatal test execution error:', err)
    process.exit(1)
  }
}

runTests()
