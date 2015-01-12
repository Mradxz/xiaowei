https://github.com/dingo/api/wiki/Installation

```javascript
<script type="text/javascript">
$.ajax({
    url: "/",
    data: {},
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'test-value');},//这里设置header
    success: function() {}
});
</script>
```