# Credențiale deploy landing (cont AWS 079862077746, eu-central-1)

`landing-deploy-policy.json` = politica inline a userului IAM `catyai-landing-deploy`
(un user, un scop: bucketul `catyai-landing-prod-079862077746`, servit de nginx de pe
box-ul Lightsail; fără CloudFront). `s3:GetBucketVersioning` e cerut de pasul de gardă
din `deploy.yml`, care refuză `sync --delete` dacă versioning-ul nu e `Enabled`.

Secretele GitHub folosite de workflow: `AWS_ACCESS_KEY_ID_LANDING`,
`AWS_SECRET_ACCESS_KEY_LANDING`, `S3_BUCKET`. `CLOUDFRONT_DISTRIBUTION_ID` nu mai e citit.
Cheia nu se salvează în fișiere; rollback = `aws iam delete-access-key` +
`aws iam delete-user-policy` pe `catyai-landing-deploy`.
