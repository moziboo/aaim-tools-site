# Uploads all files from the local "src/dist" directory to a specified AWS S3 bucket.
resource "aws_s3_object" "static_file" {
  for_each     = fileset(local.dist_dir, "**")
  bucket       = aws_s3_bucket.static_website.id
  key          = each.key
  source       = "${local.dist_dir}/${each.value}"
  content_type = lookup(local.content_types, regex("\\.[^.]+$", each.value), null)
  etag         = filemd5("${local.dist_dir}/${each.value}")
}

resource "null_resource" "invalidate_cache" {
  triggers = {
    files = sha256(join("", [for f in aws_s3_object.static_file : f.etag]))
  }

  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.s3_distribution.id} --paths /*"
  }

  depends_on = [
    aws_s3_object.static_file
  ]
}